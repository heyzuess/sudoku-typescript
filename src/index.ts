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

//test
addEventListener("DOMContentLoaded", (event) => {
    /* Test 1 - Try to fix conflict for each tile as you step through grid
    Result 1 - Failed, if only one tile is blanked at a time no other number can be used in its place

    let testTile = game.grid[0][0];

    console.log(`Checking tile for conflicts:\n${testTile}-value:${testTile.value}`);

    let conflicts = game.checkTile(testTile);
    console.log(`Conflicts: ${conflicts.length > 0}`);
    conflicts.forEach(c => console.log(`${c}-value:${c.value}`));

    if (conflicts.length > 0) {
        console.log(`Trying to correct conflict for tile:\n${testTile}-value${testTile.value}`);

        let fixed = game.resetAndCheck(testTile);
        console.log(`Fixed: ${fixed}`);

        if (fixed) {
            console.log(`New Tile:\n${testTile}-value${testTile.value}`);
        }
    }
    */

    /* Test 2 */
    /* go through each conflict and blank out for entire grid */

    //TODO: undefined tile obj - reference error to value field
    // in output of test message
    //console.log(`Random Tile:\n${randomTile}-value:${randomTile.value}`);
    //
    // need to fix this

    let checkGrid = game.grid;

    while (checkGrid.length > 0) {
        console.log(`Game grid is:`);
        console.log(game.toNumberGrid(checkGrid));

        let randomX: number = Math.floor(Math.random() * checkGrid.length);
        let randomY: number = Math.floor(Math.random() * checkGrid[randomX].length);

        console.log(`Random Tile Coordinates: ${randomX},${randomY}`);

        let randomTile: Tile = checkGrid[randomY].splice(randomX, 1)[0];

        console.log(`Random Tile:\n${randomTile}-value:${randomTile.value}`);

        let conflicts = game.checkTile(randomTile);

        console.log(`Conflicts:\n${conflicts.length > 0}`);
        console.log(conflicts);

        conflicts.forEach(c => {
            c.value = 0;
            syncTile(c);
            checkGrid[c.y].splice(c.x, 1);
            if (checkGrid[c.y].length === 0) {
                checkGrid.splice(c.y, 1);
            }
        });

        if (checkGrid[randomY].length === 0) {
            checkGrid.splice(randomY, 1);
        }
    }

    /* step through grid and try to fill blanks with numbers that have no conflicts */

    /* Test 3 */
    /* If there is a conflict in x coordinate, swap alongst y coordinate until a conflict is not found on x-coordinate
       and vice versa */
    /* Possibility that there is a conflict on both x and y coordinate */
});

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
    document.getElementById(tile.id).innerHTML = tile.value === 0 ? "&nbsp;" : String(tile.value);
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