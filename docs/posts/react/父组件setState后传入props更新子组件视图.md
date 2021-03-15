---
sidebar: false
date: "2019-8-5"
tag: react
title: 父组件setState后传入props更新子组件视图
category: 
- frontEnd
---


## 问题场景
有一段时间没有写react了,最近开始在维护一个老的react项目,遇到了一个关于生命周期的问题,子组件代码如下
 <!-- more -->
```js 
class SwitchDeviceTypeToName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceTypeState: "",
        }
    }

    componentDidMount = () => {
        this.updataState();
    }
    updataState = () => {
        const deviceTypeProps = this.props.deviceType;
        let deviceType = ifElseReturn(deviceTypeProps, {
            "1": <span value="1">电池</span>,
            "2": <span value="2">空调</span>,
        }, "无")

        this.setState({
            deviceTypeState: deviceType
        })
    }
    render() {
        const { deviceTypeState } = this.state;
        return (
            <span>
                {
                    deviceTypeState
                }
            </span>
        );
    }
}
```
场景:列表的数据需要轮询后台实时更新数据,在列表中修改了单条信息后，其他列的信息都正确更新并显示正常，唯独这个有一列没有正确更新，查看后发现原来这一列的数据中嵌套了一个子组件，
很明显子组件没有因为父组件的state更新而更新,但是明明父组件的数据是更新了的，但是父组件的更新并没有引起子组件本身重新渲染，想到了应该就是子组件生命周期的问题，继续去官网补课

## 官方小课堂
- [componentwillreceiveprops](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops) 
::: tip componentWillReceiveProps
定义：会在已挂载的组件接收新的 props 之前被调用，如果你需要更新状态以响应 prop 更改（例如，重置它），你可以比较 this.props 和 nextProps 并在此方法中使用 this.setState() 执行 state 转换。
:::
```js
    componentWillReceiveProps = nextProps => {
        this.updataState();
    }
```
这个方法可以解决这个问题，但是有个性能问题,因为如果父组件导致组件重新渲染，即使 props 没有更改，也会调用此方法,频繁的更新子组件会造成一定的性能损失，所以一般情况下如果只想处理更改，请确保进行当前值与变更值的比较。不过这个地方是列表中其中一列的组件，所以无法同上一组数据的做对比，暂且这样解决。

## 派生 state 的引发的问题
[派生state](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) ,个人理解就是子组件中在父组件更新props时更新的state，这里要了解两个名词，受控和非受控，常用来指代表单的inputs，但是也可以用来描述数据频繁更新的组件，受控是因为数据是父组件传入的props的决定的，也可以理解为组件是被父组件直接控制的。但如果数据只保存在组件内部的state的话，外部无法控制，那就是非受控了

```js
class EmailInput extends Component {
  state = { email: this.props.email };
  handleChange = event => {
    this.setState({ email: event.target.value });
  };
  componentWillReceiveProps(nextProps) {
    // 这会覆盖所有组件内的 state 更新！
    // 不要这样做。
    this.setState({ email: nextProps.email });
  }
    render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }

}
```
在这个子组件的例子中，不论在input中输入多少东西，只要父组件有更新，input的值会被立马初始化，因为调用了componentWillReceiveProps方法后直接取了传入的props，等于重新初始化一遍，但却没有对比条件。如果把更新前的数据和nextProps做对比后再操作setState，看似解决了这个问题，其实隐藏以一个问题，如果这个EmailInput组件被同一个两个公用，且两个表单输入EmailInput的值相同，这两个值在切换时是不会改变的，因为父组件传入的值是相等的,[问题示例](https://twitter.com/brian_d_vaughn/status/959600888242307072)。


### 解决的方法
官方推荐了两个解决的方法 
#### 一个是完全可控的组件
删除组件中state,可以在onChange中添加回调函数来在父组件保存输入的值，把EmailInput改造成一个轻量的函数组件：
```js
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```

#### 有 key 的非可控组件
key 是个特殊的 React 属性，当 key 变化时， React 会创建一个新的而不是更新一个既有的组件。Keys 一般用来渲染动态列表，但是这里也可以使用,如下：
```js
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```
