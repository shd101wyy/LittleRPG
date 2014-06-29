var 起始城镇;
var 商店;
var 森林;
var __物体__;
var npc = null;

起始城镇 = {
    名称 : "起始城镇", 
    介绍 : "欢迎来到起始城镇, 你的小小RPG之旅将从这里开始",
    类型 : "城镇",
    内部选项 : [],
    去外面哪里 : [],
    行为 : [],
    价值 : 10000000000,
    所有者 : npc
}
商店 = {
    名称 : "很小的商店",
    介绍 : "欢迎光临本店",
    类型 : "商店",
    内部选项 : [],
    去外面哪里 : [],
    行为 : [],
    价值 : 1000000,
    所有者 : npc
}
森林 = {
    名称 : "暮色的森林",
    介绍 : "一个阴森的森林",
    类型 : "森林",
    内部选项 : [],
    去外面哪里 : [],
    行为 : [],
    价值 : 10000000000,
    所有者 : npc
}

/*
 *
 * 定义一些行为
 *
 */
var 购买 = {
    名称 : "购买",
    行为 : function(){
        if(__物体__.类型 === "物品" && 玩家.金钱 > __物体__.价值){
            玩家.金钱 -= __物体__.价值;
            玩家.背包.push(__物体__); 
            __物体__.所有者 = 玩家;
        }
        else{
            alert("不能购买该物品 " + __物体__.名称);
        }
    }
}

起始城镇.内部选项.push(商店);
起始城镇.去外面哪里.push(森林);

商店.去外面哪里.push(起始城镇);

森林.去外面哪里.push(起始城镇);

var 玩家 = {
    名称 : "beta测试者",
    介绍 : "",
    生命值 : 10,
    力量 : 5, 
    敏捷度 : 5, 
    魔法值 : 2,
    所在地 : 起始城镇,
    背包 : [],
    金钱 : 50,
    行为 : [购买]
}

console.log(玩家)
console.log(玩家.所在地)

/*
 *
 *  现实所在地
 *  0 : 玩家名称
 *  1 : 所在地名称
 *          : 介绍
 *  2 : 内部选项
 *  3 : 去外面哪里
 *  4 : 行为
 *
 */
var 显示所在地 = function(所在地){
    __物体__ = 所在地
    console.log(所在地)
    // 显示玩家名称
    var 玩家名称 = document.createElement("button");
    玩家名称.textContent = 玩家.名称;
    玩家名称.style.background = "#C765AD";
    玩家名称.style.border = "solid 1px white";
    玩家名称.style.textAlign = "left";
    document.body.appendChild(玩家名称);
    玩家名称.onclick = function(){
        alert("Clicked me");
    }
    
    // 显示所在地
    var 提示栏 = document.createElement("div");
    提示栏.style.textAlign = "left";
    提示栏.textContent = "所在地";
    提示栏.style.background = "#454545";
    提示栏.style.border = "solid 1px white";
    document.body.appendChild(提示栏);
    
    var 名称按钮 = document.createElement("button");
    名称按钮.textContent = 所在地.名称;
    名称按钮.style.background = "#6E65C7";
    document.body.appendChild(名称按钮);
    
    var 介绍 = document.createElement("div");
    介绍.textContent = 所在地.介绍;
    介绍.style.height = "auto";
    介绍.style.fontFamily = "STHeiti";
    //介绍.style.width = "90%";
    document.body.appendChild(介绍);
    
    
    
    // 显示内部选项
    if(所在地.内部选项.length !=0){
        var 提示栏 = document.createElement("div");
        提示栏.style.textAlign = "left";
        提示栏.textContent = "选项";
        提示栏.style.background = "#454545";
        提示栏.style.border = "solid 1px white";
        document.body.appendChild(提示栏);
    }
    var 内部选项 = 所在地.内部选项;
    for(var i = 0; i < 内部选项.length; i++){
        var 内部选项按钮 = document.createElement("button");
        内部选项按钮.textContent = 内部选项[i].名称; // 显示名称
        内部选项按钮.style.background = "#659EC7";
        内部选项按钮.obj = 内部选项[i];
        document.body.appendChild(内部选项按钮);
        
        内部选项按钮.onclick = function(){
            document.body.innerHTML = "";
            显示所在地(this.obj);
        }
    }
    
    // 显示去哪里
    if(所在地.去外面哪里.length !=0){
        var 提示栏 = document.createElement("div");
        提示栏.textContent = "去外面哪里";
        提示栏.style.background = "#454545";
        提示栏.style.border = "solid 1px white";
        提示栏.style.textAlign = "left";
        document.body.appendChild(提示栏);
    }
    var 去外面哪里 = 所在地.去外面哪里;
    for(var i = 0; i < 去外面哪里.length; i++){
        var 去外面哪里按钮 = document.createElement("button");
        去外面哪里按钮.textContent = 去外面哪里[i].名称; // 显示名称
        去外面哪里按钮.style.background = "#C78E65";
        去外面哪里按钮.obj = 去外面哪里[i];
        document.body.appendChild(去外面哪里按钮);
        
        去外面哪里按钮.onclick = function(){
            document.body.innerHTML = "";
            显示所在地(this.obj);
        }
    }
    
    // 显示行为
    var 提示栏 = document.createElement("div");
    提示栏.textContent = "可选行为";
    提示栏.style.background = "#454545";
    提示栏.style.border = "solid 1px white";
    提示栏.style.textAlign = "left";
    document.body.appendChild(提示栏);
    var 行为 = 玩家.行为;//所在地.行为;
    for(var i = 0; i < 行为.length; i++){
        var 行为按钮 = document.createElement("button");
        行为按钮.textContent = 行为[i].名称; // 显示名称
        行为按钮.style.background = "#BFC765";
        document.body.appendChild(行为按钮);
        
        行为按钮.onclick = 行为[i].行为;
    }
}

显示所在地(起始城镇)










