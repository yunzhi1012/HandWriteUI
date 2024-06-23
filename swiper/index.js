const swiperDOM = document.getElementsByClassName('hw-swiper')
const swiperDOMLeft = document.getElementsByClassName('swiper-l')
const swiperDOMRight = document.getElementsByClassName('swiper-r')
const pageDOM = document.querySelector('.swiper-b')
const imgBoxDOM = document.getElementsByClassName('img-box')
const swiperWidth = window.getComputedStyle(swiperDOM[0]).width
const regex = /-?\d+/
const matchWidth = regex.exec(swiperWidth);
// mock 从服务器拿到的轮播图图片url数组
const imgList = [
    '52d325827153189c76c0956f8fe39edc.jpg',
    '96f4de71bc791b8c2505fd0dc7ae4546.jpg',
    '590ee8d39d52bf563aa535218046cfd2.jpg',
    'a191d6b4a66575c88255325f64798b24.jpg',
    'b18c10c0a5f13d111e765006757ea566.jpg',
]
const moveXList = []
for (let i = 0; i < imgList.length; i++) {
    if (i != 0)
        moveXList.push(i * matchWidth * (-1))
    else
        moveXList.push(i * matchWidth)
}
let time = null

// 动态插入img url数组
function createImgDom() {
    let baseUrl = '../img/'
    let imgBox = document.querySelector('.img-box')
    for (let index = 0; index < imgList.length; index++) {
        let childDom = document.createElement('img')
        childDom.src = baseUrl + imgList[index]
        imgBox.appendChild(childDom)
    }
    imgBoxDOM[0].style.transform = `translateX(0px)`;
}

// 根据图片数组长度，动态插入分页的DOM，注册点击跳转图片事件
function createpageDOMChild() {
    for (let index = 0; index < imgList.length; index++) {
        let childDom = document.createElement('div')
        childDom.className = 'circle'
        childDom.addEventListener('click', () => {
            swiperByPage(index)
        })
        pageDOM.appendChild(childDom)
    }
    pageDOM.children[0].classList.add('active')
}

// 获取当前图片的数组下标
function getImgIndex() {
    let str = imgBoxDOM[0].style.transform
    const match = regex.exec(str)
    return moveXList.indexOf(Number(match[0]))
}

// 根据前进后退计算位移
function swiperByArrow(type) {
    if (time !== null) {
        clearInterval(time)
        time = setInterval(() => {
            autoPlaySwiper()
        }, 2500)
    }
    let str = imgBoxDOM[0].style.transform
    const match = regex.exec(str)
    let curIndex = moveXList.indexOf(Number(match[0]))
    let dis = null
    if (type == 'left') {
        dis = Number(match[0]) + Number(matchWidth)
        if (match[0] == 0)
            dis = matchWidth * (imgList.length - 1) * (-1)
    } else {
        dis = match[0] - matchWidth
        if (match[0] == matchWidth * (imgList.length - 1) * (-1))
            dis = 0
    }
    let targetIndex = moveXList.indexOf(dis)
    imgBoxDOM[0].style.transform = `translateX(${dis}px)`;
    changePageStyle(curIndex, targetIndex)

}

// 点击分页点
function swiperByPage(targetIndex) {
    if (time !== null) {
        clearInterval(time)
        time = setInterval(() => {
            autoPlaySwiper()
        }, 2500)
    }
    let curIndex = getImgIndex()
    let dis = moveXList[targetIndex]
    imgBoxDOM[0].style.transform = `translateX(${dis}px)`;
    changePageStyle(curIndex, targetIndex)
}

// 改变分页器样式
function changePageStyle(curIndex, targetIndex) {
    pageDOM.children[curIndex].classList.remove('active');
    pageDOM.children[targetIndex].classList.add('active');
}

// 注册上一张图片事件
swiperDOMLeft[0].addEventListener('click', function () {
    swiperByArrow('left')

})

// 注册下一张图片事件
swiperDOMRight[0].addEventListener('click', function () {
    swiperByArrow('right')
})

// 自动轮播
function autoPlaySwiper() {
    let curIndex = getImgIndex()
    let targetIndex = curIndex == imgList.length - 1 ? 0 : curIndex + 1
    console.log(curIndex, "cur")
    console.log(targetIndex, "tar")
    let dis = moveXList[targetIndex]
    imgBoxDOM[0].style.transform = `translateX(${dis}px)`;
    changePageStyle(curIndex, targetIndex)
}

// 初始化
function init() {
    createImgDom()
    createpageDOMChild()
    time = setInterval(() => {
        autoPlaySwiper()
    }, 2500)
}
init()