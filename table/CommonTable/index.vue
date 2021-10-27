<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="tableCfg.showSearch" :label-width="labelWidth">
      <slot name="query"></slot>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="$handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="$resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <slot name="toolbar">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="$handleAdd"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            :loading="tableCfg.exportLoading"
            @click="$handleExport"
          >导出</el-button>
        </el-col>
      </slot>
      <right-toolbar :showSearch.sync="tableCfg.showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="tableCfg.loading" :data="tableData.rows">
      <slot name="columns"></slot>
      <slot name="operate">
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="$handleUpdate(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="$handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <pagination
      v-show="tableData.total>0"
      :total="tableData.total"
      :page.sync="pageParams.pageNum"
      :limit.sync="pageParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import TableMixin from './mixins/table'
import ToolbarMixin from './mixins/table/toolbar'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    },
    autoLoad: {
      type: Boolean,
      default: true
    },
    loadFun: {
      type: Function,
      default: () => {}
    },
    msgs: {
      type: Object,
      default: () => {}
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    labelWidth: {
      type: String,
      default: '68px'
    }
  },
  mixins: [ TableMixin, ToolbarMixin ],
  data() {
    return {
    }
  },
  created() {
    if (this.autoLoad) {
      this.getList()
    }
  },
  methods: {
    getList() {
      this.$setLoading(true)
      if (this.loadFun) {
        this.loadFun()(this.$getParams()).then(response => {
          this.$setResponse(response)
        })
      }
    }
  }
};
</script>
