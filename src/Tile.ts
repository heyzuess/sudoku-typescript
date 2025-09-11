export
class Tile {
    private _x : number;
    private _y : number;
    private _value : number;
    private _table : number;
    private _tableX : number;
    private _tableY : number;
    public id : string;

    constructor(x: number, y : number);
    constructor(x: number, y : number, value : number);
    constructor (x : number, y : number, value? : number) {
        this._x = x;
        this._y = y;

        if (value !== undefined) {
            this._value = value;
        }
    }

    public get x() : number {
        return this._x;
    }

    public get y() : number {
        return this._y;
    }

    public get value() : number {
        return this._value;
    }

    public set value(v : number) {
        if (v < 0 || v > 9) {
            throw new Error("Value must be between 0 and 9");
        }

        this._value = v;
    }

    public get table() : number { 
        return this._table;
    }

    public set table(t : number) {
        if (t < 0 || t > 8) {
            throw new Error("Table must be between 0 and 8");
        }
        this._table = t;
    }

    public get tableX() : number {
        return this._tableX;
    }

    public get tableY() : number {
        return this._tableY;
    }

    public set tableX(tableX : number) {
        this._tableX = tableX;
    }

    public set tableY(tableY : number) {
        this._tableY = tableY;
    }

    public toString() : string {
        return `x${this.x}-y${this.y}:t${this.table}-tx${this.tableX}-ty${this.tableY}`;
    }

    public static copy(tile : Tile) : Tile {
        let newTile: Tile = new Tile(tile.x, tile.y);
        newTile.value = tile.value;
        newTile.table = tile.table;
        newTile.tableX = tile.tableX;
        newTile.tableY = tile.tableY;
        newTile.id     = tile.id;

        return newTile;
    }
}