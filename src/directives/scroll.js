let scrollCallback = function(callback) {
    if (document.body.scrollHeight < 1000) {
        return
    }
    if (document.body.scrollHeight - window.scrollY - 100 <= document.body.clientHeight) {
        callback()
    }
}

export default {
    bind: function(el, binding, vnode) {
        window.addEventListener("scroll", scrollCallback.bind({}, binding.value))
    },

    unbind: function() {
        window.removeEventListener("scroll", scrollCallback)
    }
}
