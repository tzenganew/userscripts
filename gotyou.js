// ==UserScript==
// @name         gotyou.js
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  监控抖音直播聊天，对特定用户名进行点击
// @author       You
// @match        https://live.douyin.com/*
// @match        https://www.douyin.com/follow/live/*
// @grant        none
// @downloadURL https://raw.githubusercontent.com/tzenganew/userscripts/main/gotyou.js
// @updateURL https://raw.githubusercontent.com/tzenganew/userscripts/main/gotyou.js
// ==/UserScript==

(function() {
    'use strict';

    // 寻找目标元素的函数
    function findTargetElement() {
        // 获取所有class为webcast-chatroom___list的div元素
        const elements = document.getElementsByClassName('webcast-chatroom___list');

        // 检查是否有至少两个元素，返回第二个
        if (elements.length >= 2) {
            return elements[1];
        }

        return null;
    }

    // 处理新添加的元素
    function handleNewElement(element) {
        // 查找内容为"来了"的span元素
        const spanElements = element.getElementsByTagName('span');
        for (let span of spanElements) {
            if (span.textContent.trim() === '来了') {
                // 获取前一个span元素
                const nameSpan = span.previousElementSibling;
                if (nameSpan && nameSpan.tagName === 'SPAN') {
                    // 检查用户名
                    if (nameSpan.textContent.includes("friselove") || nameSpan.textContent.includes("用户")) {
                        // 触发点击事件
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        nameSpan.dispatchEvent(clickEvent);
                        console.log(`已点击用户名: ${nameSpan.textContent}`);
                    }
                }
                break; // 找到后退出循环
            }
        }
    }

    // 设置观察者
    function setupObserver(targetElement) {
        // 配置观察选项
        const config = {
            childList: true,
            subtree: true
        };

        // 创建观察者实例
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 处理每个新增的节点
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // 确保是元素节点
                            handleNewElement(node);
                        }
                    });
                }
            }
        });

        // 修正：将observerserver.observer.observe改为observer.observe
        observer.observe(targetElement, config);
        console.log('已开始监控聊天消息');
    }

    // 初始化函数，寻找目标元素并设置观察
    function init() {
        const targetElement = findTargetElement();
        if (targetElement) {
            console.log('找到目标元素，开始设置监控');
            setupObserver(targetElement);
        } else {
            console.log('未找到目标元素，5秒后重试');
            setTimeout(init, 5000); // 5秒后重试
        }
    }

    // 页面加载完成后初始化
    window.addEventListener('load', init);
})();
