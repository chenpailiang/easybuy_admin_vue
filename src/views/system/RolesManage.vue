<script setup>
import Icon from '@/components/common/Icon'
import UserColumn from './common/UserColumn'
import RoleInfo from './role/RoleInfo'
import { ref } from 'vue'

let roles = ref([])

// 角色新增编辑
let roleInfo = ref({})
let roleDialog = ref(false)
let isAdd = ref(false)
let showEdit = v => {
	isAdd.value = false
	roleDialog.value = true
	roleInfo.value = JSON.parse(JSON.stringify(v))
}
let sendRole = _ => {}

// 分页处理
let curPage = ref(1)
let pageSize = ref(20)
let total = ref(400)
let sizeChange = v => {}
let currentChange = v => {}
</script>

<template>
    <h2>角色管理</h2>

    <section>
      <span>角色名称：</span>
      <el-input placeholder="请输入角色名称" />
      <span>状态：</span>
      <el-select placeholder="请选择状态" />
      <el-button type="primary">查询</el-button>
    </section>

    <div class="op">
      <div>
        <el-button type="primary" @click="roleDialog = true;isAdd = true">新增模块</el-button>
        <el-button type="primary">分配用户</el-button>
        <el-button type="primary">分配权限</el-button>
      </div>
      <Icon Icon="Refresh" :size="20" color="#409eff" @click="refresh" style="cursor: pointer;" />
    </div>

    <el-table :data="roles" row-key="id" :header-cell-style="{ background: '#f5f7fa', color: '#000000' }"
      border>
      <UserColumn />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" align="center">
        <template #default="{ row: v }">
          <el-button type="danger" text size="small">停用</el-button>
          <el-button type="primary" text size="small">启用</el-button>
          <el-button type="primary" text size="small" @click="showEdit(v)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="curPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, sizes, jumper" :total="total"
      @size-change="sizeChange" @current-change="currentChange" />

    <el-dialog v-model="roleDialog" :title="isAdd ? '新增角色' : '编辑角色'">
      <RoleInfo :roleInfo="roleInfo" />
      <template #footer>
        <el-button @click="roleDialog = false">取消</el-button>
        <el-button type="primary" @click="sendRole">确定</el-button>
      </template>
    </el-dialog>
</template>

<style scoped>
section {
	display: grid;
	grid: auto/ repeat(2, 5rem 10rem) 5rem;
	align-items: center;
	gap: 0 1rem;
	margin-bottom: 1rem;
}
.op {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}
</style>