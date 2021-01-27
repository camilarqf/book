import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import "vuetify/dist/vuetify.min.css";


Vue.use(Vuetify,{
    /* theme:{
        primary: colors.indigo.base,
        info: colors.blue.lighten2,
        accent: colors.green.lighten1,
        error: colors.red.darken2
    } */
});
const opts = {};

export default new Vuetify(opts);
