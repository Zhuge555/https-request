import { _decorator, Component, Node } from 'cc';
import HttpsUti from './HttpsUtil';
import { ApifoxModel } from './ApifoxModel';
import { ApifoxModelGet } from './ApifoxModelGet';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    start() {
        // post data
        let postRequestData: ApifoxModel = {
            collection_id: "collect_id_123",
            openid: "123",
            spot_id: "spot_id_123",
        };

        // get data
        let getRequestData: ApifoxModelGet = {
            limit: 5,
            openid: '123',
            page: 2,
        }

        // send get request
        async function getData(){
            const result = await HttpsUti.get('http://47.95.205.36:9080/server/Index/getCollectionList', getRequestData);
            if (result.success) {
                console.log('GET request success: ', result.data);
            } else {
                console.error('GET request fail: ', result.message);
            }
        }

        // 发送POST请求
        async function postData() {
            const result = await HttpsUti.post('http://47.95.205.36:9080/server/Activity/composite', postRequestData);
            if (result.success) {
                console.log('POST request success: ', result.data);
            } else {
                console.error('POST request fail: ', result.message);
            }
        }
        
        getData();
        postData();
    }

    update(deltaTime: number) {
        
    }
}


