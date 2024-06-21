class HttpsUtil {
    /**
     * 发送GET请求
     * @param url 请求的URL
     * @param params 请求参数对象
     */
    static async get(url: string, params: Record<string, any> = {}): Promise<any> {
        try {
            const queryString = new URLSearchParams(params);
            const response = await fetch(`${url}?${queryString.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await HttpsUtil.handleResponse(response);
            return { success: true, data: responseData };
        } catch (error) {
            return HttpsUtil.handleError(error);
        }
    }

    /**
     * 发送POST请求
     * @param url 请求的URL
     * @param data 请求体数据对象
     */
    static async post(url: string, bodyData: Record<string, any>): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            const responseData = await HttpsUtil.handleResponse(response);
            return { success: true, data: responseData };
        } catch (error) {
            return HttpsUtil.handleError(error);
        }
    }

    /**
     * 处理响应
     * @param response fetch API的响应对象
     */
    private static async handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({message: 'unknow error'}));
            throw new Error(errorData.message || '请求失败');
        }
        return await response.json();
    }

    /**
     * 处理错误
     * @param error 错误对象
     */
    private static handleError(error: any): any {
        console.error('网络请求发生错误:', error);
        return { success: false, message: error.message || '网络请求失败' };
    }
}

/** 
 * defalt export only one model
 * can use any name when import
 * 
 * normal export can export many model
 * need to use same name when import with {}
 */
export default HttpsUtil;

/**
 * 静态(static)方法：绑定类(class)而非实例。可直接通过类名访问
 * HttpsUtil.handleResponse()
 * 非静态方法：绑定到类的实例上。需创建实例才能访问
 * let example = new Example();
 * example.handleResponse();
 */