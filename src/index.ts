import { Sudoku } from "./Sudoku.js";
import { Tile } from "./Tile.js";

let game : Sudoku = new Sudoku();
let tableGrid : Tile[][] = game.tableGrid;
let html : string = game.transformGrid(game.toNumberGrid(tableGrid));

document.getElementById("canvas").innerHTML = html;