import {State} from "./state";
import {Pojo} from "./types";

import {IDBPDatabase, IDBPTransaction, openDB, StoreNames} from 'idb';

export class StatePersistor {

    private stateList: { name: string, state: State<any>; }[] = [];

    constructor(
        private dbName: string,
        private dbVersion: number,
    ) {}

    /**
     * Persisting instances of classes may cause problems during startup
     *
     * @param name
     * @param state
     */
    add(name: string, state: State<Pojo>) {
        this.stateList.push({name, state})
    }

    async start() {
        const self = this;
        const db = await openDB(this.dbName, this.dbVersion, {
            upgrade(database: IDBPDatabase<any>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<any, StoreNames<any>[], "versionchange">) {
                for (let stateObj of self.stateList) {
                    database.createObjectStore(stateObj.name);
                }
            }
        });

        await Promise.all(this.stateList.map(async (stateItem) => {
            const initialData = await db.get(stateItem.name, "data");
            if (initialData) {
                await stateItem.state.update((s) => {
                    Object.keys(initialData).forEach(key => {
                        s[key] = initialData[key];
                    })
                });
            }
        }));

        this.stateList.map((stateItem) => {
            stateItem.state.subscribe(async () => {
                await db.put(stateItem.name, stateItem.state.getState(), "data");
            });
        });
    }
}