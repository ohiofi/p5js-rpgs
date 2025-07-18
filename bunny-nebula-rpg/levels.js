let world = [];

class Level{
  constructor(lineArray){
    this.walls = [];
    this.tile = 0;
    this.trees = [];
    this.doors = [];
    for(let row in lineArray){
      for(let column in lineArray[row]){
        switch(lineArray[row].charAt(column)) {
          case "=":
              this.walls.push({x:column,y:row,sprite:"brick"})
              break;
          case "c":
              this.walls.push({x:column,y:row,sprite:"cliff"})
              break;
          case "r":
              this.walls.push({x:column,y:row,sprite:"bigrock"})
              break;
          case "t":
              this.trees.push({x:column,y:row,sprite:"tree"})
              break;
          case "g":
              this.trees.push({x:column,y:row,sprite:"tallgrass"})
              break;
          case "o":
              this.doors.push({x:column,y:row,goto:0})
              break;
        }
      }
    }
  }
}

// Level 0
let levelArray = [];
levelArray.push("rgccccccccccccg  gg gg g g gg ggg gg gg");
levelArray.push("r  gg gggtt tt   g g g gg ggg gg g gg ggr");
levelArray.push("rg      t  tt tr   gg g gg g gg gg g gg g");
levelArray.push("r tg t t t  tt   g  g g gg g gg gg g ggg");
levelArray.push("r g t tt t tt tr rgg g gg g gg gg g gg g");
levelArray.push("rt   t t t  tt  g g g gg ggg gg g tg gg");
levelArray.push("r  tg     gtt tr g  g g gg g gg gg g ggg");
levelArray.push("r t t=    tg tt  g ggg g g g gg ggg gg gg");
levelArray.push("r  g===    ggt r g g g tg g gg gg g ggg");
levelArray.push("r t=====   ===  g  gg gg g g gg ggg gg gg");
levelArray.push("r t=====  =ttt=r g g g gg ggg gg g gg ggr");
levelArray.push("r t=====  =ttt=    rrr   ggrg gg g gg gg g gg");
levelArray.push("r  =o===  g= = r r rrr r rgg g ggtg gg gg g gg g");
levelArray.push("r gg     g      ccccoccccc g gtgtgg ggg gg g gg ggr");
levelArray.push("gcccccccccccccc  gg  g g ggg gtg t tgtggg gg");
levelArray.push("   gg g gg g gg gg g gg gg gtt ggttgg tg gtg g g gg gg");
levelArray.push(" g g g gg ggg gg g gg ggr g g gttg gtgg tgtg ggg");
levelArray.push("g  gg gg g g gg ggg gg gg  ttg t gt gtgt ggtg gg g");
levelArray.push("  g g g tg g gg gg g ggg tg gttg tggt g ggtg gg gg g");
levelArray.push(" rgg g gg g gg gg g gg g gtggg ttggt ggtgggttg");
levelArray.push("g g g gg ggg gg g tg gggg g tg g gg gttg gg ggg g gg");
levelArray.push(" g ggg g g g gg ggg gg gg g g g gg ggg gg g gg gg");
levelArray.push(" g  g g gg g gg gg g ggg g g g tg g gg gg g ggg");
levelArray.push("g ggcccccccccccccc  gg  g   gg g gg g gg gg g gg g");
world[0] = new Level(levelArray);
world[0].doors[0].goto = 1;
world[0].doors[1].goto = 2;

// level 1 -=-=-=-=-=-=- http://www.delorie.com/game-room/mazes/genmaze.cgi
levelArray.length = 0;
levelArray = ["=o===================================================================================================","      =   =     =   =   =             =     =     =     =         =   =       =     =       =       =","= === = = = === = === = = = ========= = === = === = = = = ======= = = === === ===== = ======= ===== =","= =   = = = =   =     =   = =       = =   =   = =   = =   =       = =     =       = = =       =     =","= = === = === ============= = ===== = === ===== ===== ===== ================= = = = = = ======= =====","= =   = =   = =     =         =     = =   =   =       =   =     =     =     = = = = = = =       =   =","= === = === = ===== = =============== === = = ========= = ===== === === === = = = = = = = ======= = =","=   = =   =       =   =     = =       =   = =     =     =   =   =       =   = = = = =   =   =   = = =","=== = === === === ========= = = ======= === === = = ======= = === = ===== === = = = = ===== = = = = =","= = = = =   = =   =   =         =       =   = = = =     =   =     =     = =   = =   =   =   = = = = =","= = = = ===== = === = = ========= ========= = = = ===== = ===== ===== === = === ======= = === === = =","=   =   =   = = =   = = =         =       = =   = =     =     = =   = =   = = =       = =   =     = =","=      == = = = = === = = = ======= ===== === === = === ======= = = = = === = ===== = = === ======= =","=  =o=  = =   =   =   = = = =     = =   =   = = = = = = =       = =   = = = =   =   = =   =     =   =","======= = ========= === = === = = = === === = = = = = = = ======= ===== = = === = === = = ===== = ===","=     = = =   =   = =         = =   =     = = = = =   =   =   = = =   = = = = =   =   = =     = = = =","= === = = = === = = = = ======= ===== ===== = = = ========= = = = = = = = = = === = ========= = = = =","=   =   = = =   = = = =       =   = = =   = =   = =   =     = =   = =     = = =   = =         =   = =","=== ===== = = === = = ===== = === = = = = = ===== = = = ===== ======= ===== = = === = ============= =","=   =     = = =   =   =     = =   =     = = =       = =     =   =   = =     = = =   =         =     =","= = = = === = === ===== ===== = === ======= = ================= = = = = ===== = = =========== = === =","= =   =     =   =   =   =     =   = =       =     =       =   = = = =   =   = = = =   =   =   = =   =","= ============= === = =========== = ======= = ===== ===== = = = = ========= = === = = = = = ===== ===","=     =       =   = =       = =   =   = =     =   =   =   = = = =     =   = =   = = = = =       = = =","===== = ===== = = ======= = = = ===== = = = === = === = === = = === = = = = === = === ========= = = =","=     = =     = =         =   =     =     =     =     =     = =   = = = =   = = = =   =   = =   = = =","= ======= ===== ============= ===== ============= =========== === = = = ===== = = = === = = = === = =","= =     =   =   =   =       = =   = =   =     =   =     =     =   = = = =     = = = = = =   = =   = =","= = === === ===== = = ======= = = = === === = ===== === = ===== ===== = = ===== = = = = ===== = = = =","= =   =   =     = = =         = = =     =   =     =   = = =   = =   = = =       =   =       = = =   =","= = ===== ===== = = ============= ======= ======= ===== = = = = === = = ===== = ===== ===== = = =====","= =   =       = = = =     =     = = =   = =     =     =   = =   =   = =     = =     =     = =   =   =","= === ========= === = === = === = = = = = = === = === = === ===== === ===== ===== = = ===== = === = =","=   = =   =     =     =   = =   = =   =   = =   =   = =   = =   =   = =   =   =   = = =   = =   = = =","=== = = = = ===== = ===== = ===== = ======= = = === = === = = = === = = = === ===== === = = === = = =","=   =   =   =     = = =   =   =   =       = = = = = =   =     =     = = =               =       = = =","= ======= ========= = = ===== = ======= = = = = = = === = = ===== === === ========= ======= ======= =","= =     = =   =     = =     = =         = = = =   = =   = = =     =     = =     = =   = =   =       =","= = === = = = = = === ===== = =========== = = ===== ===== = ======= = = = = === = === = = === =======","= =   = = = =   = =   =     =           =   = =   =       =   =   = = =       =   =   =   =         =","= === = = = = === = = = ======= ======= = === === =========== === = = ============= ========= ===== =","=     = = = =   = = =         = =       =   =   =   =       =   =   =   =     = =   =   =       =   =","======= = = ===== = =========== = ======= ===== === === ======= ======= = === = = = === = ======= ===","=       = =   =   =     =     = = =     = =     = =   =   =   =   =     =   =     =       =     =   =","= = ===== = === = ======= = = = = = === === = === === === = = === = = ===== =========== === === === =","= = =   = =   = = =   =   = = = =   =   =   =     =   = = = =   =   =     =   =     =   =   =       =","= = = = = = = = === = = ===== = ===== === ========= === = = = = ===== === === = = === === === =======","= = = = = = = =     = =     =     = =   =   =     =   = =   = = =   =   =   = = = =   =   =   =     =","=== = = = === ======= ===== ===== = ======= = === === = ===== = = = ======= = === = === === === === =","=   = =       =     = =   =     = =         = =     = =       =   =         = =   = =     =     =   =","= === === ===== === = = = ===== = === ========= === = ======= ===== ======= = = === = =========== ===","=   = =   = =   =   = = = =     =     =     =     = =   =     =   = =     = =   = = =   =         = =","= = === === = === = = = = = =========== === = = = ===== = ===== = === === = ===== = === = ========= =","= =     =     =   =   = = =     =       =   = = =     = = =     =   =   = = = =     =   =       =   =","========= = === ======= = ===== ========= === = ======= = = ======= = = === = = ===== ===== === = = =","=     = = = = = =     = = =   =     =     = = = =       = = =     =   =   = =   =   = =     = =   = =","= === = = = = = ===== = === = ===== = ===== = = = ======= = = === ======= = ===== = = ======= ===== =","= =   =   =   = =       =   =         =     = =   =   =   = = =     =   =   =     = =   =   = =   = =","= ============= = ===== = ========= = = = = = ===== = = === = = === === ===== ===== === = = = = = = =","=           =   = =   =   = =   =   =   = = =     = = = =   = =   = =   =   =   = =     = = = = =   =","= === === === ===== = ===== = = = ======= = = ===== === = === === = = ===== === = ========= = ===== =","= =   = =   = =     =     = = = = =       = =     =     = =   =   = =         = =     =   =   =     =","=== === = = = ======= = = = = === = ======= ===== ========= === === ======= = = = === = = = === =====","=   =   = =       =   = = = =     = =       =     =       = =   =   =   = = = = = = =   = = = = =   =","= === ======= === = === === ======= = ======= === ======= = ===== === = = = = = = = ===== = = = = = =","=   =       =   = =   =   =         = =     =   = =       =     =   = =   = = = = =       =     = = =","= = ======= = === ======= =========== ===== ===== = ===== = === = = = ===== = = = =============== = =","= = =     = = =       =       =   = =     = =     =     = =   = = = =   =   = = = =   =   =     = = =","= = = = === = = ===== === === = = = ===== = = ========= = === = === = = = ===== = = = = = = === = = =","= = = =     = =   =   =   = = = =   =     = = =         = =   =   =   =   =   =   = = = =   =     = =","= = = ======= === = === === = = ===== ===== = =========== = ===== ===== === = ===== = = ===== = === =","= = =     =   =   = =     =   = = =   =     =       =     =     =   =     = =   =   = = =     = =   =","= = = === = === ===== === = === = = = = ========= === ============= = ===== === = === = = ======= = =","= = = =   =   = =     =   =     =   =   = =     =   = =       =   = = =     = = = = =   =     =   = =","= = === ===== = = ================= ===== = = = === = === === = = = = = === = = = = = ======= = =====","= = =   =   = =   =     =           =   =   = =   = = =   = = = = = =   =   = = =   =     =   = =   =","= === === = = === ===== = =========== = = === === = = = === = = === ========= = ========= ===== === =","=   = =   =   =         =       =     = = =   =   =   = =   = =     =         = =       =     = =   =","=== = ========= ======= ======= = ======= = === === === = === = = === ========= = ===== ===== = = ===","=   =   =   =   =     =   =   = =   =   = = =   =   =   = = =   =   = =     =     =   = =     = =   =","= ===== = = = ======= === = = = = = = = = = ======= = === = ========= ===== = ===== = = = ===== === =","=       = =   =       =   = = = = =   = = = =       = = = =       =   =   = =     = = = = =   =     =","========= ===== = ========= = = ===== = = = = ======= = = ===== = = = = = = === === === = = = =======","=       = =   = = = =       = =     = = = =   =   =   =     =   = = =   =         =   =   = = =     =","= ===== = = = = = = = =========== === = = === = = = ======= = === ========= ===== === = = = = = =====","= =     =   =   =   =   =   =     =   =   =   = =   =   = =   =   =         =       = = = = = =     =","= =============== ===== = = = ===== ======= === ===== = = === = === === ============= = === = ===== =","= =         =   =         = =     = =     =     =     =   =   =     =   =       =   = =     =   =   =","= = ======= = = ======= === ===== = = =========== ========= ===== === ========= = = = ========= = ===","=   =     =   =         =   =   =   =       =     =       =     =   =     = =   = = = = =     =   = =","===== === === =========== === = =========== = ===== ===== ===== ========= = = = = = = = = = = = === =","=     =   =   =         =   = = =     =   = = =   = =   =     =   =   =   = = = = = = =   = =       =","= ======= ===== =========== = = ===== = = = = = = = = = ===== === = = = === = = = = = = =============","=       =       = =         = =       = =   =   = = = = =   =   = = = =   =   = = =   = =           =","= ===== ===== === = ========= ========= ===== === = = = = = === = = = === ===== = ===== === ======= =","=     = =     = =           =         = =   =   = = = =   =   =   = =   =     =   =   =     =       =","======= = ===== === ======= === = ===== = = === === = ======= === = ========= = === = ======= ===== =","= =     =       = = =     =   = = =   =   =   =     = =       =   =         =   =   =       = =     =","= = = =========== = === = === = = = = === === ======= = =================== ===== = ======= = = =====","=   =                   =   =   =   =     =           =                   =       =       =   =      ","====================================================================================================="];
world[1] = new Level(levelArray);
world[1].doors[0].goto = 0;
world[1].doors[1].goto = 0;



// Level 2
levelArray.length = 0;
levelArray.push("==t  t==")
levelArray.push("=t  t=")
levelArray.push("==t  t==")
levelArray.push("=t  t=")
levelArray.push("==t  t==")
levelArray.push("==t  t==")
levelArray.push("=t  t=")
levelArray.push("==t  t==")
levelArray.push("=t  t=")
levelArray.push("==t  t==")
levelArray.push("=t  t=")
levelArray.push("=t   t==")
levelArray.push("=o=====")
levelArray.push("=t  t==    r  r       ")
levelArray.push("==t  t=     r  r r ror")
levelArray.push("=t  t==    r  r r rrrr")
levelArray.push("==t  t=")
levelArray.push("=t  t==")
levelArray.push("==t  t==")
levelArray.push("=t  t=")
levelArray.push("==t  t==")
levelArray.push("=t  t=")
levelArray.push("==t  t==")
world[2] = new Level(levelArray);
world[2].doors[0].goto = 0;
world[2].doors[1].goto = 0;