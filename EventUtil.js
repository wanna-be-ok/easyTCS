/**
 * Created by Administrator on 2017/8/2.
 * ����DOM��IE���¼��󶨡�event���¼�Ŀ�ꡢ��ֹð�ݡ���ֹĬ����Ϊ
 */


var EventUtil ={
    //�¼���    element �¼����� type �¼�  handler ִ�к���
        addHandler : function (element,type,handler) {
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent('on'+type, handler);
            }else{
                element['on'+type]=handler;
            }
        },
    //�¼��Ƴ�
        removeHandler : function (element, type, handler) {
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent('on'+type,handler);
            }else{
                element['on'+type]=null;
            }
        },

    //������¼������ڻ��event�Ļ���֮��
    //event
    getEvent : function(event){
        return event ?event :window.event;
    },
    //target
    getTarget : function(event){
        return event.target || event.srcElement;
    },
    //preventDefault ��ֹĬ���¼�
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    //stopPropagation ��֯��һ���Ĳ�������ð��
    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble= true;
        }
    },
    //���Ԫ�� relatedTarget  ����mouseover��mouseout�ġ�Ŀ��Ԫ�ء��͡����Ԫ�ء�
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
    //��갴ť mousedown mouseup
    getButton : function(){
        if(document.implementation.hasFeature('MouseEvents',2.0)){
            //mousedown ��mouseup��DOM�¼��� 0��ʾ��� 1��ʾ���� 2��ʾ�Ҽ�
                return event.button;
        }else{
            //ͬ�����¼���IE�� ���䰴��DOM�л�Ϊ����
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
    //�����ַ��� ��Ϊ����  ��Ϊ����
    gerWheelDelta : function (event) {
        if(event.wheelDelta){
            //opera���������������������෴ client.engine�Ǽ��������ķ���
            return (client.engine.opera && client.engine.opera < 9.5 ?
            -event.wheelDelta : event.wheelDelta);
        }else{
            //firefox����� -3Ϊ���� +3 Ϊ���� ��˲���Ҫת��������  ��Ҫ*40
            return -event.detail*40
        }
    },
    //���charCode��keyCode
    getCharCode : function(event){
        if(typeof event.charCode == "number"){
            return event.charCode;
        }else{
             return event.keyCode;
        }
    },
    //���ʼ������е����� ��IE����window���� �����������event����ֻ����IE��һֱ����
    getClipboardText : function(event){
        var clipboardText = (event.clipboardData || window.clipboardData);
        return clipboardData.getData('text');
    },
    //getData�����ڴӼ�������ȡ������ ��IE�� text��URL���ָ�ʽ���������������MIME��ʽ���������á�text����text��plain��
    // setData��һ������Ҳ����������  �ڶ�����Ҫ���ڼ������е��ı�
    setClipboardText : function(event,value){
        if(event.clipboardData){
            return event.clipboardData.setData('text/plain',value);
        }else if(window.clipboardData){
            return window.clipboardData.setData('text',value);
        }
    }
};

