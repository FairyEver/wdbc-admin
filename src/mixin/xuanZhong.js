import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    methods: {
        xzSubmit (poolCompute, params, setting, unSelectRate = 0, selectRate = 0) {
            // 数组 数组每一项还是数组 分别是每一步淘汰的个体
            const unSelect = poolCompute.map(e => e.unSelect.pool);
            // 选中的 数组 每一项是最后选中的个体
            const select = poolCompute[poolCompute.length - 1].select.pool;
            let markList = [];
            // 添加淘汰的记录
            unSelect.forEach((e, step) => {
                e.forEach(item => {
                    markList.push({
                        identity: item.id, // 身份号
                        breedingPoint: setting.stage, // 选育点
                        sex: setting.sex, // 性别
                        ...setting.stage === 1 ? {rate: unSelectRate} : {}, // 等级 只有第一个选育点有 在这里是计算等级3
                        step: step + 1, // 第几个步骤 只有淘汰的鸡有 没有此字段的话代表这个个体是入选的 只存大步骤 从1开始
                        ...setting.stage === 3 ? {optUse: setting.breedingUse} : {} // 只有在第三个选育点有 选种用途
                    });
                });
            });
            // 添加入选记录
            select.forEach(e => {
                markList.push({
                    identity: e.id, // 身份号
                    breedingPoint: setting.stage, // 选育点
                    sex: setting.sex, // 性别
                    ...setting.stage === 1 ? {rate: selectRate} : {}, // 等级 只有第一个选育点有 在这里是计算等级3 入选的是21
                    ...setting.stage === 3 ? {optUse: setting.breedingUse} : {} // 只有在第三个选育点有 选种用途
                });
            });
            const selectSeedConditionsList = params.map((e, step) => ({
                strain: setting.strain,
                gen: setting.gen,
                breedingPoint: setting.stage,
                optUse: setting.breedingUse,
                sex: setting.sex,
                indexId: e.keyName,
                indexAttr: e.PEG,
                step: step + 1,
                param: JSON.stringify({
                    param: e.param,
                    paramSub: e.paramSub
                })
            }));
            axiosToken({
                url: '/a/pickout/markDetail/save',
                method: 'post',
                data: {
                    markList,
                    selectSeedConditionsList
                }
            }).then(res => {
                this.$Message.success(res.data.msg);
            }).catch(error => axiosErrorHandler(error));
        }
    }
};
