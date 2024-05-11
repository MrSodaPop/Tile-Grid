// --------- Global Assignments --------- 
let settings = 
{
    changed: false,
    generalSettings: {
        enforce_square_tiles: true,
        nrows: 6,
        ncols: 6,
    },
    context:
    {
        view_width: $("document").width(),
        view_height: $("document").height()
    },
    selected: [0,0],
    tiles: []
};


// --------- General Functions --------- 
function createTiles()
{
    $(".tile-grid").html('');
    let rows = settings.generalSettings.nrows;
    let cols = settings.generalSettings.ncols;
    let tiles = {};
    if (rows <= 0 || cols <= 0)
    {
        rows = 6;
        cols = 6;
    }
    let view_width = $(".tile-grid").width();
    let view_height = $(".tile-grid").height();
    margin_side = Math.max(Math.floor(view_width * 0.1 / cols / 2), 1);
    margin_top = Math.max(Math.floor(view_height * 0.1 / rows / 2), 1);
    width = Math.floor(view_width * 0.9 / cols);
    height = Math.floor(view_height * 0.9 / rows);

    if (settings.generalSettings.enforce_square_tiles)
    {
        height = width;
        margin_top = margin_side;
    }

    for (let x = 0; x < cols; x++)
    {
        for (let y = 0; y < rows; y++)
        {
            let new_tile = `<div class=\"tile\" id=\"${x}-${y}\"></div>`;
            settings.tiles[[x, y]] = {
                colour: "#969696",
                height: height,
                width: width,
                margin_side: margin_side,
                margin_top: margin_top,
                hidden: false
            }
            $(".tile-grid").append(new_tile);
        }
    }
    $(".tile").css("width", `${width}px`);
    $(".tile").css("height", `${height}px`);
    $(".tile").css("margin", `${margin_top}px ${margin_side}px ${margin_top}px ${margin_side}px`);
}

function displayTileSettings()
{
    let curr = settings.tiles[settings.selected];
    $("#colour").val(curr.colour);
    $("#height").val(curr.height);
    $("#width").val(curr.width);
    $("#hidden").prop('checked', false);
    if (curr.hidden)
    {
        $("#hidden").prop('checked', true);
    }
}

function updateTileSettings()
{
    let selection = `#${settings.selected[0]}-${settings.selected[1]}`;
    let curr = settings.tiles[settings.selected];

    curr.colour = $("#colour").val();
    curr.height = $("#height").val();
    curr.width = $("#width").val();
    curr.hidden = $("#hidden").prop('checked');



    $(selection).css("width", `${curr.width}px`);
    $(selection).css("height", `${curr.height}px`);
    $(selection).css("margin", `${curr.margin_top}px ${curr.margin_side}px ${curr.margin_top}px ${curr.margin_side}px`);
    if (curr.hidden)
    {
        $(selection).css("background-color", "#bebebe");
    }
    else
    {
        $(selection).css("background-color", `${curr.colour}`);
    }
}

function updatePageSettings()
{
    let changedGeneral = false;
    let checked = $("input[@id=setting-square-tiles]:checked").length > 0;
    let nrows = parseInt($("#nrows").val());
    let ncols = parseInt($("#ncols").val());
    if ((nrows && ncols) && (nrows != settings.generalSettings.nrows || ncols != settings.generalSettings.ncols))
    {
        settings.generalSettings.nrows = nrows;
        settings.generalSettings.ncols = ncols;
        changedGeneral = true;
    }
    if (checked != settings.generalSettings.enforce_square_tiles)
    {
        settings.generalSettings.enforce_square_tiles = checked;
        changedGeneral = true;
    }

    if (changedGeneral) createTiles();
    displayTileSettings();
}

$("document").ready(function(){
    displayTileSettings();
    $("html").on("click", function(){
        updateTileSettings();
    })
    $("#apply-master-settings").on("click", function(){
        updatePageSettings();
    })
    $(".tile-grid").on("click", ".tile" ,function(){
        settings.selected = [parseInt(this.id.split('-')[0]), parseInt(this.id.split('-')[1])]
        displayTileSettings();
    })
    $(".menu-wrapper").on("hover", function(){
        updateTileSettings();
    });
    $("html").on("keyup", function(){
        updateTileSettings();
    })
    $("html").on("keydown", function(){
        updateTileSettings();
    })
    $("html").on("hover", function(){
        updateTileSettings();
    })
})
