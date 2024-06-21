class HttpsUtil {
    /**
     * send GET request
     * @param url request URL
     * @param params request object params
     */
    static async get(url: string, params: Record<string, any> = {}): Promise<any> {
        try {
            const queryString = new URLSearchParams(params);
            const response = await fetch(`${url}?${queryString.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            // pass to response handle function to deal with response
            const responseData = await HttpsUtil.handleResponse(response);
            // update state
            return { success: true, data: responseData };
        } catch (error) {
            // pass to error handle function to deal with error
            return HttpsUtil.handleError(error);
        }
    }

    /**
     * send POST request
     * @param url request URL
     * @param data request object params
     */
    static async post(url: string, bodyData: Record<string, any>): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // convert into JSON if not
                body: JSON.stringify(bodyData),
            });
            const responseData = await HttpsUtil.handleResponse(response);
            return { success: true, data: responseData };
        } catch (error) {
            return HttpsUtil.handleError(error);
        }
    }

    /**
     * manage response
     * @param response fetch API's object
     */
    private static async handleResponse(response: Response): Promise<any> {
        // ok is a Response status, returned value from server
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({message: 'unknow error'}));
            throw new Error(errorData.message || 'request fail');
        }
        return await response.json();
    }

    /**
     * manage error
     * @param error error object
     */
    private static handleError(error: any): any {
        console.error('internet request error: ', error);
        return { success: false, message: error.message || 'server request fail' };
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