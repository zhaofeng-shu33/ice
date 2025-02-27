import * as _ from 'lodash';
import Page from './modules/page';
import Dependency from './modules/dependency';
import Configuration from './modules/configuration';
import Task from './modules/task';
import Layout from './modules/layout';
import Menu from './modules/menu';
import Router from './modules/router';
import Git from './modules/git';
import DEF from './modules/def';
import OSS from './modules/oss';
import Todo from './modules/todo';
import { II18n } from '../../interface';

import * as zhCN from './locales/zh-CN.json';
import * as enUS from './locales/en-US.json';

export const locales = {
  zhCN,
  enUS,
};

export const baseModules = {
  Page,
  Dependency,
  Configuration,
  Task,
  Layout,
  Menu,
  Router,
  Git,
  DEF,
  OSS,
  Todo,
};

export default async (i18n: II18n) => {
  const adapter: any = {
    Guide: {
      cover: 'https://img.alicdn.com/tfs/TB1CDlTdEKF3KVjSZFEXXXExFXa-300-300.png',
      isAvailable: true,
      module: null
    },
    QuickDev: {
      cover: 'https://img.alicdn.com/tfs/TB1hcJCe.uF3KVjSZK9XXbVtXXa-300-300.png',
      isAvailable: true,
      module: null,
    },
    Dependency: {
      cover: 'https://img.alicdn.com/tfs/TB1nPY8c21H3KVjSZFBXXbSMXXa-300-300.png',
      isAvailable: true,
      module: Dependency
    },
    Page: {
      cover: 'https://img.alicdn.com/tfs/TB1Vl4javBj_uVjSZFpXXc0SXXa-300-300.png',
      isAvailable: true,
      module: Page
    },
    Layout: {
      cover: 'https://img.alicdn.com/tfs/TB1KUD8c4iH3KVjSZPfXXXBiVXa-300-300.png',
      isAvailable: false,
      module: Layout
    },
    Router: {
      cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
      isAvailable: false,
      module: Router
    },
    Menu: {
      cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
      isAvailable: false,
      module: Menu
    },
    QuickBuild: {
      cover: 'https://img.alicdn.com/tfs/TB1P8pAe79E3KVjSZFGXXc19XXa-300-300.png',
      isAvailable: false,
      module: null,
    },
    Git: {
      cover: 'https://img.alicdn.com/tfs/TB1GVb_c79E3KVjSZFGXXc19XXa-300-300.png',
      isAvailable: false,
      module: Git
    },
    OSS: {
      cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
      isAvailable: false,
      module: OSS
    },
    DEF: {
      cover: 'https://img.alicdn.com/tfs/TB1qDkAXMFY.1VjSZFnXXcFHXXa-300-300.png',
      isAvailable: false,
      module: DEF
    },
    Todo: {
      cover: 'https://img.alicdn.com/tfs/TB1zZJKdEGF3KVjSZFmXXbqPXXa-300-300.png',
      isAvailable: false,
      module: Todo
    },
    Task: {
      cover: '',
      isAvailable: true,
      module: Task
    },
    Configuration: {
      cover: '',
      isAvailable: true,
      module: Configuration
    },
  };

  _.forEach(adapter, (config, name) => {
    config.title = i18n.format(`baseAdapter.config.${name}.title`);
    config.description = i18n.format(`baseAdapter.config.${name}.des`);
  });

  return adapter;
};
