// ==UserScript==
// @name         chatroom
// @namespace    tzenganew
// @version      1.0
// @description  chatroom
// @author       You
// @match        https://live.douyin.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tzenganew/userscripts/main/chatroom.user.js
// @updateURL    https://raw.githubusercontent.com/tzenganew/userscripts/main/chatroom.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 寻找目标元素的函数
    function findChatroomLists() {
        const chatroomLists = document.querySelectorAll('.webcast-chatroom___list');
        
        if (chatroomLists.length >= 2) {
            console.log('已找到两个或更多.webcast-chatroom___list元素，开始监听...');
            observeChatrooms(chatroomLists);
        } else {
            console.log(`只找到 ${chatroomLists.length} 个.webcast-chatroom___list元素，10秒后重试...`);
            setTimeout(findChatroomLists, 10000);
        }
    }

    // 监听聊天室新增消息的函数
    function observeChatrooms(chatroomLists) {
        // 创建一个通用的MutationObserver实例
        const observer = new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 遍历所有新增的节点并输出innerHTML
                    mutation.addedNodes.forEach(node => {
                        if (node instanceof HTMLElement) {
                            console.log(node.innerHTML);
                        }
                    });
                }
            }
        });

        // 配置观察选项
        const config = { childList: true, subtree: true };

        // 对每个找到的聊天室列表元素启动观察
        chatroomLists.forEach(list => {
            observer.observe(list, config);
        });
    }

    // 页面加载完成后10秒开始寻找元素
    window.addEventListener('load', () => {
        console.log('页面加载完成，10秒后开始寻找.webcast-chatroom___list元素...');
        setTimeout(findChatroomLists, 10000);
    });
})();    
