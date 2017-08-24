import '../photoswipe/default-skin/default-skin.css'
import 'photoswipe/dist/photoswipe.css'
import UI from '../photoswipe/photoswipe-ui-default.js'
import PhotoSwipe from 'photoswipe/dist/photoswipe.js'

import html from './index.html';

let UUID = 0;
let pswpBox = document.createElement('div')
pswpBox.innerHTML = html;
pswpBox.className = 'pswp-box';
document.body.appendChild(pswpBox);


/**
 *
 * @param {Number} index 初始展示图片索引
 * @param {Object} items 图片列表src,w,h,origin,msrc
 * @param {HTMLELement=} root 包含所有图片的跟节点
 * @param {Object=} params 配置参数，itemClass重要配置参数，包含图片的最小节点类名
 */
export default function (index, items, root, params = {}) {
  let itemClass = params.itemClass || 'preview-img'
  let pswp
  let download = params.download || function (item) {
    let a = document.createElement('a');
    a.setAttribute('download', '');
    a.href = item.origin || item.src;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  delete params.download
  let options = Object.assign({
    index: index,
    galleryUID: ++UUID,
    bgOpacity: 0.6,
    history: false,
    closeOnScroll: true,
    shareButtons: [{
      id: 'download',
      label: '下载',
      url: '{{raw_image_url}}',
      download: true
    }],
    download() {
      let item = pswp.currItem;
      download(item)
    },
    getThumbBoundsFn(index) {
      let thumbnail = items[index].el || root && root.querySelectorAll(`.${itemClass}`)[index] // find thumbnail
      if (!thumbnail) {
        return
      }
      let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      let rect = thumbnail.getBoundingClientRect()
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
    }
  }, params)

  let pswpElement = pswpBox.querySelector('.pswp')
  pswp = new PhotoSwipe(pswpElement, UI, items, options)
  pswp.init()
  return pswp
}
