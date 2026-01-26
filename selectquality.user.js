// ==UserScript==
// @name         selectquality
// @namespace    tzenganew
// @version      0.1.2
// @description  select quality
// @author       tzenganew
// @match        https://live.douyin.com/*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://raw.github.com/tzenganew/userscripts/main/selectquality.user.js
// @updateURL    https://raw.github.com/tzenganew/userscripts/main/selectquality.user.js
// ==/UserScript==

(function() {
    'use strict';

    function clickQualitySelectorLastDiv() {
        // 1. 选取data-e2e属性值为"quality-selector"的div元素
        const qualitySelector = document.querySelector('div[data-e2e="quality-selector"]');

        // 2. 安全检查：确保父元素存在
        if (qualitySelector) {
            // 3. 获取该元素下所有的div子元素
            const divChildren = qualitySelector.querySelectorAll('div');
            
            // 4. 安全检查：确保有div子元素
            if (divChildren.length > 0) {
                // 5. 获取最后一个div子元素
                const lastDiv = divChildren[divChildren.length - 1];
                
                // 6. 触发点击事件
                lastDiv.click();
                console.log('[抖音直播脚本] 已成功触发最后一个div的点击事件');
            } else {
                console.warn('[抖音直播脚本] data-e2e="quality-selector"的div下没有找到任何div子元素');
            }
        } else {
            console.warn('[抖音直播脚本] 未找到data-e2e="quality-selector"的div元素');
        }
    }

    setTimeout(clickQualitySelectorLastDiv, 500000); // 3分钟 = 3*60*1000 = 180000毫秒

})();
