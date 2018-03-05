export default {
    props: {
        formDef: {
            type: Object,
            required: false,
            default: () => ({})
        },
        mode: {
            type: String,
            required: false,
            default: 'new'
        }
    }
};
