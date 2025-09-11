import { Sudoku } from "./Sudoku.js";
import { Tile } from "./Tile.js";

let game : Sudoku = new Sudoku();
let html : string = game.toString();
let activeCell : Tile;

document.getElementById("canvas").innerHTML = html;

game.grid.forEach( row => {
    row.forEach(col => {
        let temp = document.getElementById(col.id);
        temp.onclick = () => setActiveCell(col.x, col.y);
    })
});

addEventListener("keypress", (event) => readInput(event));

console.log(game.toNumberGrid(game.grid));
console.log(game.grid);

console.log(game.toNumberGrid(game.tableGrid));
console.log(game.tableGrid);

console.log(game.checkTile(game.grid[0][0]));

function setActiveCell(x: number, y: number) : void {
    let temp;

    if (activeCell !== undefined) {
        temp = document.getElementById(activeCell.id);
        temp.classList.remove("active");
    }

    activeCell = game.grid[y][x];
    console.log(`Active cell: ${activeCell.toString()}`);

    temp = document.getElementById(activeCell.id);
    temp.classList.add("active");

    DetailPane.column.value = String(activeCell.x);
    DetailPane.row.value = String(activeCell.y);
    DetailPane.table.value = String(activeCell.table);
    DetailPane.tableCol.value = String(activeCell.tableX);
    DetailPane.tableRow.value = String(activeCell.tableY);
    DetailPane.value.value = String(activeCell.value);
}

function readInput(event) : void {
    if (event.key >= "0" && event.key <= "9") {
        if (activeCell !== undefined) {
            activeCell.value = event.key;
            syncTile(activeCell);
        }
    }
}

function syncTile(tile: Tile) {
    document.getElementById(tile.id).innerHTML = String(tile.value);
    DetailPane.value.value = String(tile.value);
}

class DetailPane {
    public static get element() {
        return DetailPane._get("detailPane");
    }

    public static get column() {
        return DetailPane._get("col");
    }

    public static get row() {
        return DetailPane._get("row");
    }

    public static get table() {
        return DetailPane._get("table");
    }

    public static get tableCol() {
        return DetailPane._get("table_col");
    }

    public static get tableRow() {
        return DetailPane._get("table_row");
    }

    public static get value() {
        return DetailPane._get("value");
    }

    private static _get(name: string) {
        return document.getElementById(name) as HTMLInputElement;
    }
}