(function () {
    var util = {
        isArray: function (list) {
            return util.type(list) === 'Array';
        },
        type: function (obj) {
            return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
        },
        each: function (array, fn) {
            for (var i = 0, len = array.length; i < len; i++) {
                fn(array[i], i);
            }
        },
        setAttr: function (node, key, value) {
            switch (key) {
                case 'style':
                    node.style.cssText = value;
                    break;
                case 'value':
                    var tagName = node.tagName || '';
                    tagName = tagName.toLowerCase();
                    if (tagName === 'input' || tagName === 'textarea') {
                        node.value = value;
                    } else {
                        node.setAttribute(key, value);
                    }
                    break;
                case 'method':
                    for (var i in value) {
                        node.addEventListener(i, value[i], false);
                    }
                    break;
                default:
                    node.setAttribute(key, value);
                    break;
            }
        }
    }

    var Vnode = function (tagName, props, children) {
        if (!(this instanceof Vnode)) {
            return new Vnode(tagName, props, children);
        }

        if (util.isArray(props)) {
            children = props;
            props = {};
        }

        this.tagName = tagName;
        this.props = props || {};
        this.children = children || [];
        this.key = props ? props.key : void 666;
        var count = 0;
        util.each(this.children, function (child, i) {
            if (child instanceof Vnode) {
                count += child.count;
            } else {
                children[i] = '' + child;
            }
            count++;
        });
        this.count = count;
    }
    Vnode.prototype.render = function () {
        var el = document.createElement(this.tagName);
        var props = this.props;
        for (var propName in props) {
            var propValue = props[propName]
            util.setAttr(el, propName, propValue);
        }
        if (typeof this.children === 'string') {
            var childEl = document.createTextNode(this.children)
            el.appendChild(childEl);
        }
        else {
            util.each(this.children, function (child) {
                var childEl = (child instanceof Vnode) ? child.render() : document.createTextNode(child);
                el.appendChild(childEl);
            });
        }
        return el;
    }

    window.Vnode = Vnode;
})();
