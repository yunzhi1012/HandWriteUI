const swiperDom = document.getElementsByClassName('hw-swiper')
const swiperDomLeft = document.getElementsByClassName('swiper-l')
const swiperDomRight = document.getElementsByClassName('swiper-r')
const pageDom = document.querySelector('.swiper-b')
// mock 从服务器拿到的轮播图图片url数组
const imgList = [
    '52d325827153189c76c0956f8fe39edc.jpg',
    '96f4de71bc791b8c2505fd0dc7ae4546.jpg',
    '590ee8d39d52bf563aa535218046cfd2.jpg',
    'a191d6b4a66575c88255325f64798b24.jpg',
    'b18c10c0a5f13d111e765006757ea566.jpg',
]
let time = null

// 获取当前图片的数组下标
function getImgIndex() {
    const getImgStr = window.getComputedStyle(swiperDom[0]).backgroundImage
    const str = getImgStr.slice(0, -2)
    const regex = /\/img\/(.+)/;
    const match = regex.exec(str);
    return imgList.indexOf(match[1])
}

// 点击箭头根据type判断下一张图片
function swiperByArrow(type, index) {
    let targetIndex = null;
    type == 'left' ?
        targetIndex = index == 0 ? imgList.length - 1 : index - 1 :
        targetIndex = index == imgList.length - 1 ? 0 : index + 1
    swiperDom[0].style.backgroundImage = `url('../img/${imgList[`${targetIndex}`]}')`
}

// 点击分页点
function swiperByPage(targetIndex) {
    let curIndex = getImgIndex()
    swiperDom[0].style.backgroundImage = `url('../img/${imgList[`${targetIndex}`]}')`
    changePageStyle(curIndex, targetIndex)
}

// 根据图片数组长度，动态插入分页的DOM，注册点击跳转图片事件
function createPageDomChild() {
    for (let index = 0; index < imgList.length; index++) {
        let childDom = document.createElement('div')
        childDom.className = 'circle'
        childDom.addEventListener('click', () => {
            swiperByPage(index)
        })
        pageDom.appendChild(childDom)
    }
    pageDom.children[0].classList.add('active')
}

// 改变分页器样式
function changePageStyle(curIndex, targetIndex) {
    pageDom.children[curIndex].classList.remove('active');
    pageDom.children[targetIndex].classList.add('active');
}

// 自动轮播
function autoPlaySwiper() {
    let curIndex = getImgIndex()
    let targetIndex = curIndex == imgList.length - 1 ? 0 : curIndex + 1
    swiperDom[0].style.backgroundImage = `url('../img/${imgList[`${targetIndex}`]}')`
    changePageStyle(curIndex, targetIndex)
}

// 初始化
function init() {
    swiperDom[0].style.backgroundImage = `url('../img/${imgList[0]}')`
    time = setInterval(() => {
        autoPlaySwiper()
    }, 2500)
}

// 注册上一张图片事件
swiperDomLeft[0].addEventListener('click', () => {
    let curIndex = getImgIndex()
    let targetIndex = curIndex > 0 ? curIndex - 1 : imgList.length - 1
    swiperByArrow('left', getImgIndex())
    changePageStyle(curIndex, targetIndex)
})

// 注册下一张图片事件
swiperDomRight[0].addEventListener('click', () => {
    let curIndex = getImgIndex()
    let targetIndex = curIndex + 1 > imgList.length - 1 ? 0 : curIndex + 1
    swiperByArrow('right', curIndex)
    changePageStyle(curIndex, targetIndex)
    if (time !== null) {
        clearInterval(time)
        time = setInterval(() => {
            autoPlaySwiper()
        }, 1500)
    }
    swiperDom[0].classList.add('active')
})

createPageDomChild()
init()

