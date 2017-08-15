/**
 * Created by Administrator on 2017/8/2.
 * 兼容DOM和IE的事件绑定、event、事件目标、阻止冒泡、阻止默认行为
 */


var EventUtil ={
    //事件绑定    element 事件对象 type 事件  handler 执行函数
        addHandler : function (element,type,handler) {
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent('on'+type, handler);
            }else{
                element['on'+type]=handler;
            }
        },
    //事件移除
        removeHandler : function (element, type, handler) {
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent('on'+type,handler);
            }else{
                element['on'+type]=null;
            }
        },

    //下面的事件都是在获得event的基础之上
    //event
    getEvent : function(event){
        return event ?event :window.event;
    },
    //target
    getTarget : function(event){
        return event.target || event.srcElement;
    },
    //preventDefault 阻止默认事件
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    //stopPropagation 组织进一步的补货或者冒泡
    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble= true;
        }
    },
    //相关元素 relatedTarget  关于mouseover和mouseout的‘目标元素’和‘相关元素’
    getRelatedTarget : function (event){
        if(event.relatedTarget){
           return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    //鼠标按钮 mousedown mouseup
    getButton : function(){
        if(document.implementation.hasFeature('MouseEvents',2.0)){
            //mousedown 和mouseup在DOM事件中 0表示左键 1表示滚轮 2表示右键
                return event.button;
        }else{
            //同样的事件在IE中 将其按照DOM中化为三类
            switch (event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    //鼠标滚轮方向 正为向上  负为向下
    gerWheelDelta : function (event) {
        if(event.wheelDelta){
            //opera浏览器与其他浏览器正负相反 client.engine是检测浏览器的方法
            return (client.engine.opera && client.engine.opera < 9.5 ?
            -event.wheelDelta : event.wheelDelta);
        }else{
            //firefox浏览器 -3为向上 +3 为向下 因此不仅要转换正负号  还要*40
            return -event.detail*40
        }
    },
    //检测charCode和keyCode
    getCharCode : function(event){
        if(typeof event.charCode == "number"){
            return event.charCode;
        }else{
             return event.keyCode;
        }
    },
    //访问剪贴板中的数据 在IE中是window对象 其他浏览器是event对象，只有在IE中一直存在
    getClipboardText : function(event){
        var clipboardText = (event.clipboardData || window.clipboardData);
        return clipboardData.getData('text');
    },
    //getData是用于从剪贴板中取得数据 （IE中 text和URL两种格式）（其他浏览器是MIME格式不过可以用‘text代表text、plain）
    // setData第一个参数也是数据类型  第二个是要放在剪贴板中的文本
    setClipboardText : function(event,value){
        if(event.clipboardData){
            return event.clipboardData.setData('text/plain',value);
        }else if(window.clipboardData){
            return window.clipboardData.setData('text',value);
        }
    }
};

