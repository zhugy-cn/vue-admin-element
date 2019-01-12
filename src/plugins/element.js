import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';



import {
  Loading,
  Message,
  Form,
  FormItem,
  Input,
  Button,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  // 表格
  Table,
  TableColumn,
  Pagination,
} from 'element-ui';

Vue.use(Loading);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);

Vue.prototype.$message = Message;
