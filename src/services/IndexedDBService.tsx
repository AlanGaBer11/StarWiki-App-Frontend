class IndexedDBService {
  private dbName = "StarWikiDB";
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private cacheTimeout = 15 * 60 * 1000; // 15 minutos

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error("Error al abrir IndexedDB");
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log("IndexedDB inicializada");
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const stores = ["posts", "users", "comments", "categories"];
        stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: "key" });
          }
        });
      };
    });
  }

  async saveData(storeName: string, key: string, data: any): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.put({
        key,
        data,
        timestamp: Date.now(),
      });

      request.onerror = () => {
        console.error("Error al guardar en IndexedDB:", request.error);
        reject(request.error);
      };
      transaction.oncomplete = () => {
        console.log(`✅ Datos guardados en ${storeName}:${key}`);
        resolve();
      };
    });
  }

  async getData(storeName: string, key: string): Promise<any | null> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => {
        console.error("Error al leer de IndexedDB:", request.error);
        reject(request.error);
      };
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          console.log(`⚠️ No hay datos en cache para ${storeName}:${key}`);
          resolve(null);
          return;
        }

        // Verificar si el caché ha expirado
        const age = Date.now() - result.timestamp;
        if (age > this.cacheTimeout) {
          console.log(
            `⏰ Cache expirado para ${storeName}:${key} (${Math.round(
              age / 1000
            )}s)`
          );
          resolve(null);
          return;
        }

        console.log(
          `🎯 Datos recuperados del cache ${storeName}:${key} (${Math.round(
            age / 1000
          )}s)`
        );
        resolve(result.data);
      };
    });
  }

  async getAllData(storeName: string): Promise<any[]> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result
          .filter((item: any) => {
            const age = Date.now() - item.timestamp;
            return age <= this.cacheTimeout;
          })
          .map((item: any) => item.data);
        resolve(results);
      };
    });
  }

  async deleteData(storeName: string, key: string): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => {
        console.log(`🗑️ Datos eliminados: ${storeName}:${key}`);
        resolve();
      };
    });
  }

  async clearStore(storeName: string): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => {
        console.log(`🧹 Store limpiado: ${storeName}`);
        resolve();
      };
    });
  }
}

export default new IndexedDBService();
