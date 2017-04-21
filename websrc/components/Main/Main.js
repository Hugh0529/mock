/* eslint-disable no-unused-vars */
import React from 'react';
import {Input, Button} from 'antd';
import {api} from 'src/fetch/fetch';
import jsonFormater from 'src/utils/jsonFormater';

import './main.less';
/* eslint-disable no-unused-vars */

const Search = Input.Search;

const AUTOSIZE_CONFIG = {
    minRows: 10,
    maxRows: 20
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
            setting: false,
            resetting: false,
            searchUrl: '',
            jsonString: ''
        };
    }

    handleSearchUrlChange(event) {
        this.setState({
            searchUrl: event.target.value
        });
    }

    handleSearch(value) {
        this.setState({searching: true});
        const param = {
            url: value
        };
        api.getDataByUrl(param)
            .then(data => {
                this.setState({
                    searching: false,
                    jsonString: jsonFormater(data)
                });
            })
            .catch(err => {
                this.setState({
                    searching: false
                });
            });
    }

    handleJsonChange(event) {
        this.setState({
            jsonString: event.target.value
        });
    }

    setByUrl() {
        this.setState({setting: true});
        const param = {
            url: this.state.searchUrl,
            data: this.state.jsonString
        };
        api.setDataByUrl(param)
            .then(data => {
                this.setState({
                    setting: false
                });
            })
            .catch(err => {
                this.setState({
                    setting: false
                });
            });
    }

    resetDataByUrl() {
        this.setState({resetting: true});
        const param = {
            url: this.state.searchUrl
        };
        api.resetDataByUrl(param)
            .then(data => {
                this.setState({
                    resetting: false,
                    jsonString: jsonFormater(JSON.stringify(data))
                });
            })
            .catch(err => {
                this.setState({
                    resetting: false
                });
            });
    }

    formatJsonString() {
        this.setState({
            jsonString: jsonFormater(this.state.jsonString)
        });
    }

    render() {
        return (
            <div className="main">
                <Search
                    placeholder="input search url"
                    style={{width: '100%', marginBottom: '15px'}}
                    value={this.state.searchUrl}
                    onChange={this.handleSearchUrlChange.bind(this)}
                    onSearch={this.handleSearch.bind(this)}
                />

                <Input type="textarea" autosize={AUTOSIZE_CONFIG}
                       style={{width: '100%', marginBottom: '15px'}}
                       value={this.state.jsonString}
                       onChange={this.handleJsonChange.bind(this)}/>

                <div className="clearfix">
                    <Button type="primary" className="fl" style={{marginRight: '15px'}}
                            onClick={this.setByUrl.bind(this)}>Set</Button>
                    <Button className="fl" onClick={this.formatJsonString.bind(this)}>Format</Button>
                    <Button className="fr" onClick={this.resetDataByUrl.bind(this)}>Reset</Button>
                </div>

                <h2 className="title">Usage</h2>
                <ul className="list">
                    <li>proxy api url to the mock server (use charles or other tool)</li>
                    <li>must add '/mock' before the origin api url</li>
                    <li>example: `http://waimai.baidu.com/strategyui/getindex`to`{location.origin}/mock/strategyui/getindex`</li>
                    <li>you can search `/strategyui/getindex` to get the data</li>
                    <li>just support json now ...</li>
                </ul>

                <h2 className="title">TODO</h2>
                <h3 className="sub-title">功能</h3>
                <ul className="list">
                    <li>若没有设置过接口数据，会请求线上以拉取数据减少复制粘贴，可增加设置代理请求的地址</li>
                    <li>但是上述功能因我的 docker 机不能访问外网而被 block，后续解决 docker 机代理上网，可先部署到有外网权限的机器</li>
                    <li>或者可工具化部署到本地</li>
                    <li>目前以接口为纬度储存，可考虑用用户纬度，区分不同用户的设置，及同步用户设置功能</li>
                    <li>增加已设置代理的列表查看</li>
                    <li>增加拉取数据接口的参数设置，可手动拉取同步(现在是请求转发)</li>
                </ul>
                <h3 className="sub-title">系统</h3>
                <ul className="list">
                    <li>短时间实现功能，前端后端都有很多不完善的地方：</li>
                    <li>现在数据存在内存中，重启会丢失，需做落地</li>
                    <li>日志</li>
                    <li>后端鉴权、参数检查不全</li>
                    <li>后端错误处理</li>
                    <li>前端错误处理和各类提示</li>
                    <li>前端 json 操作更友好，以及提供比 json 更友好的界面操作</li>
                </ul>
            </div>
        );
    }
}

export default Main;
