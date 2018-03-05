import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import { all, spread, axios, axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import clipboard from 'clipboard';
import html2canvas from 'html2canvas';
import rasterizehtml from 'rasterizehtml';
import moment from 'moment';