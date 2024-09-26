import { defineStore } from 'pinia'
import { getUserInfor } from '@/api/userInfor'
const useUserInfor = defineStore('userinfor', {
    state: () => ({
        imageUrl: '',
        name: '',
        sex: '',
        department: '',
        identity: '',
        account: '',
        email: '',
        id:''
    }),
    actions: {
        async userInforData(id) {
            const res = await getUserInfor(id);
            if (res && res.data) {
                this.account = res.data.account;
                this.imageUrl = res.data.image_url;
                this.name = res.data.name;
                this.sex = res.data.sex;
                this.department = res.data.department;
                this.identity = res.data.identity;
                this.email = res.data.email;
                this.id= res.data.id;
            }
        }
    },
    persist: {
        enabled: true,
        key: 'userinfor',
        storage: localStorage // 注意这里的小写 s，因为 Pinia 的 persist 插件通常期望的是小写  
    }
});

export default useUserInfor;