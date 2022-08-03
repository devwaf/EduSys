import request from "../utils/request";

interface IServiceOption {
    path: string,
    method?: string,
    data?: any,
    query?: Object | string,
    header?: Object,
    before?: Function,
    after?: Function
}

function _service(option: IServiceOption) {
    return new Promise(async (resolve, reject) => {
        try {
            let url = option.path + option.query
            let res = await request[option.method](url, option.data)
          

            resolve(res.data || res)
        } catch (err) {
            reject(err)
        }
    })
}

function parserObjToQueryStringify(query: Object | string) {
    if (typeof query == "string")
        return query

    let k: string, result = "?"
    for (k in query) {

        result += `${k}=${query[k]}&`
    }
    return result.slice(0, -1)
   
    
}

export function service(option: IServiceOption) {
    if (option.before) {
        if (!option.before()) return Promise.resolve(false)
    }
    option.method = option.method ? option.method.toLowerCase() : 'get'

    option.query = option.query && parserObjToQueryStringify(option.query) || ""

    option.header = option.header || { "Accept-Encoding": "gzip" }


    return new Promise(async (resolve, reject) => {
        try {
            let res = await _service(option)
            resolve(res)
            option.after && option.after()
        } catch (err) {
            reject(err)
            option.after && option.after()
        }

    })

}