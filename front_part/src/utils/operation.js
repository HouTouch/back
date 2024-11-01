import { operationLog } from "@/api/log"

export const tracking = async (module,operation_person,operation_object,operation_level,operation_status) => {
    if (module == '管理员') {
        let operation_content = `对管理员'${operation_object}'进行了删除操作`
        await operationLog(operation_person, operation_content, operation_level)
    }
    if (module == '产品') {
        let operation_content = `对产品'${operation_object}'进行了出库操作，审核结果为'${operation_status}'`
        await operationLog(operation_person, operation_content, operation_level)
    }

}