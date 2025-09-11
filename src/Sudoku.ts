import { Tile } from "./Tile.js";

export
class Sudoku {
    private _width : number;
    private _height : number;
    private _grid : Tile[][];
    private _tableGrid : Tile[][];

    constructor () {
        this._width = 9;
        this._height = 9;
        this._grid = this._makeTileGrid(this._width, this._height);
        this._tableGrid = this._toTableGrid();
    }

    public get width() : number {
        return this._width;
    }

    public get height() : number {
        return this._height;
    }

    public get grid() : Tile[][] {
        let copy: Tile[][] = [];

        this._grid.forEach(row => {
            copy.push(Array.from(row));
        });

        return copy;
    }

    public get tableGrid() : Tile[][] {
        let copy: Tile[][] = [];

        this._tableGrid.forEach(row => {
            copy.push(Array.from(row));
        });

        return copy;
    }

    private _makeTileGrid(width : number, height: number) : Tile[][] {
        let grid : Tile[][] = [];
        let list: number[] = [];
    
        for (let i : number = 0; i < width; i++) {
            list.push(i + 1);
        }
        
        for (let i : number = 0; i < width; i++) {
            grid.push([]);
            let tempList = Array.from(list);
        
            for (let j : number = 0; j < height; j++) {
                let next : number = Math.floor(Math.random() * tempList.length);
                let tempA = tempList.splice(next, 1);
                let temp : number = tempA[0];
                let tile : Tile = new Tile(j, i);
                tile.value = temp;
        
                //console.log(`i: ${i} j: ${j} next: ${next} ` +
                //            `length: ${tempList.length} tempA: ${tempA}` +
                //            ` temp: ${temp}`);
        
                grid[i].push(tile);
            }
        }
    
        return grid;
    }

    private _toTableGrid() : Tile[][] {
        let ret : Tile[][] = [];
        let idx : number = 0;
        let start : number = 0;
        let end : number = 0;
        let temp : Tile;
        let range : number = 3;
        
        for (let l = 0; l < range; l++) {
            for (let k = 0; k < range; k++) {
                start = k * range;
                end = start + range - 1;

                ret.push([]);

                let tableY : number = 0;
                for (let i = idx; i <= idx + range - 1; i++) {

                    let tableX : number = 0;
                    for (let j = start; j <= end; j++) {
                        let tile = this._grid[i][j];
                        tile.table = ret.length - 1;
                        tile.tableX = tableX;
                        tile.tableY = tableY;
                        tile.id = tile.toString();
                        ret[ret.length - 1].push(tile);
                        tableX++;
                    }
                    tableY++;
                }
            }

            idx += range;
        }

        return ret;
    }

    public toNumberGrid(grid : Tile[][]) : number[][] {
        let ret : number[][] = [];

        grid.forEach(row => {
            let temp = [];

            row.forEach(tile => {
                temp.push(tile.value);
            });

            ret.push(temp);
        });

        return ret;
    }

    public transformGrid (list : number[][]) : string {
        let returnVal : string = '<table class="mainTable">\n';
    
        list.forEach((row, i) => {
            //console.log(`transformGrid \t` +
            //            `i: ${i}`);
    
            // Start - 1st entry of each row
            if ((i + 3) % 3 == 0) {
                returnVal += "<tr>\n";
            }
    
            let tempRow : string = `<td><table class="box" id="table-${i + 1}">\n`;
    
            // Split each array into 3 rows each
            row.forEach((col, j) => {
                if ((j + 3) % 3 == 0) {
                    tempRow += "<tr>\n";
                }
                
                let rowId : number = Math.floor(i / 3) + Math.floor(j / 3);
                let colId : number = j; //(rowId * list.length) + j;
    
                let id : string = `t${i}-i${j}:r${rowId}-c${colId}`;
                let tempCol : string = `<td id="${id}" class="cell val-${col}">${col}</td>\n`;
                tempRow += tempCol;
                
                if ((j + 1) % 3 == 0) {
                    tempRow += "</tr>\n";
                }
            });
    
            tempRow += "</table></td>\n";
            returnVal += tempRow;
    
            // End - 1st entry of each row
            if ((i + 1) % 3 == 0) {
                returnVal += "</tr>\n";
            }
        });
    
        returnVal += "</table>";
    
        return returnVal;
    }

    public toString () : string {
        let returnVal : string = '<table class="mainTable">\n';
        let list = this._tableGrid; //this._grid;

        list.forEach((row, i) => {
            //console.log(`transformGrid \t` +
            //            `i: ${i}`);
    
            // Start - 1st entry of each row
            if ((i + 3) % 3 == 0) {
                returnVal += "<tr>\n";
            }
    
            let tempRow : string = `<td><table class="box" id="table-${i + 1}">\n`;
    
            // Split each array into 3 rows each
            row.forEach((col, j) => {
                if ((j + 3) % 3 == 0) {
                    tempRow += "<tr>\n";
                }
    
                let tempCol : string = `<td id="${col.id}" class="cell val-${col.value}">${col.value === 0 ? "&nbsp;" : col.value}</td>\n`;
                tempRow += tempCol;
                
                if ((j + 1) % 3 == 0) {
                    tempRow += "</tr>\n";
                }
            });
    
            tempRow += "</table></td>\n";
            returnVal += tempRow;
    
            // End - 1st entry of each row
            if ((i + 1) % 3 == 0) {
                returnVal += "</tr>\n";
            }
        });
    
        returnVal += "</table>";
    
        return returnVal;
    }

    public checkTile(tile: Tile) : Tile[] {
        let ret: Tile[] = [];
        let grid: Tile[][] = this.grid;

        if (tile.value === 0) return ret;

        for (let i = 0; i < grid[tile.y].length; i++) {
            let t = grid[tile.y][i];
            if (t.value === 0) continue;
            if (t.x === tile.x && t.y === tile.y) continue;
            if (t.value === tile.value) ret.push(t);
        }

        for (let i = 0; i < grid.length; i++) {
            let t = grid[i][tile.x];
            if (t.value === 0) continue;
            if (t.x === tile.x && t.y === tile.y) continue;
            if (t.value === tile.value) ret.push(t);
        }
        
        return ret;
    }

    public resetAndCheck(tile: Tile) : boolean {
        let retVal: boolean = false;
        let list: number[] = [];

        for (let i = 0; i < 9; i++) {
            list.push(i + 1);
        }

        let tempList: number[] = Array.from(list);
        let newTile: Tile = Tile.copy(tile); 

        while (tempList.length > 0 && !retVal) {
            let next: number = Math.floor(Math.random() * tempList.length);
            let newVal: number = tempList.splice(next, 1)[0];
            newTile.value = newVal;

            let conflicts: Tile[] = this.checkTile(newTile);
            retVal = conflicts.length === 0;
        }

        if (retVal) tile.value = newTile.value;

        return retVal;
    }
}