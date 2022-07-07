import {State} from "./state";
import {Pojo} from "../../_/types";

import {IDBPDatabase, IDBPTransaction, openDB, StoreNames} from 'idb';
import {inlineErr} from "../../_/inline-error";

export class StatePersistor {

    private stateList: { name: string, state: State<any>; }[] = [];
    private db?: IDBPDatabase<any>;
    private connectionPromise?: Promise<any>;
    private clearing = false;

    constructor(
        private dbName: string,
        private dbVersion: number,
    ) {}

    add(name: string, state: State<Pojo & {ready: boolean}>) {
        state.holdUpdates();
        this.stateList.push({name, state})
    }

    async init() {
        const self = this;
        this.connectionPromise = inlineErr(openDB(this.dbName, this.dbVersion, {
            upgrade(database: IDBPDatabase<any>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<any, StoreNames<any>[], "versionchange">) {
                const storeNames = Array.from(transaction.objectStoreNames);
                for (let stateObj of self.stateList) {
                    if (storeNames.indexOf(stateObj.name) === -1) {
                        database.createObjectStore(stateObj.name);
                    }
                }
            }
        }));

        const [db, err] = await this.connectionPromise;

        this.db = db
        const storeNames = Array.from(db?.objectStoreNames || []).sort();
        const stateNames = this.stateList.map(it => it.name).sort();

        if (!stateNames.every((stateName) => storeNames.indexOf(stateName) > -1)) {
            alert("IndexedDB: store names are different, Increment Db version")
            throw "IndexedDB: store names are different, Increment Db version";
        }

        if (err) {
            alert("IndexedDB: Error happened while configuring IndexedDB");
            throw err;
        }

        if (db) {
            await Promise.all(this.stateList.map(async (stateItem) => {
                console.log("Reading initial data for state", stateItem.name);
                const initialData = await db.get(stateItem.name, "data");

                if (initialData) {
                    console.log(`Initial data loaded for state`, stateItem.name);
                } else {
                    console.warn("No initial data for state", stateItem.name);
                }

                await stateItem.state.releaseUpdates((s) => {
                    Object.assign(s, initialData, {ready: true});
                });
            }));

            this.stateList.map((stateItem) => {
                stateItem.state.subscribe(async () => {
                    if (!this.clearing) {
                        const {ready, ...state} = stateItem.state.getState();
                        await db.put(stateItem.name, state, "data");
                    }
                });
            });
        }
    }

    async clear() {
        let err: Error | undefined;
        this.clearing = true;
        await this.connectionPromise;

        if (this.db) {
            for (let it of this.stateList) {
                err = err || (await inlineErr(this.db.clear(it.name)))[1];
            }
        }

        this.clearing = false;

        if (err) {
            throw "IndexedDB: Cannot clear it once it was not opened";
        }
    }
}