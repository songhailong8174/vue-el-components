export default {
  data() {
    return {
      tableCfg: {
        loading: false,
        exportLoading: false,
        showSearch: true
      },
      tableData: {
        rows: [],
        total: 0
      },
      pageParams: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    $getParams() {
      let queryParams = this.queryParams || {}
      Object.assign(queryParams, this.pageParams)
      return queryParams
    },
    $handleQuery() {
      this.pageParams.pageNum = 1
      this.getList()
    },
    $resetQuery() {
      this.resetForm("queryForm")
      this.$handleQuery()
    },
    $setLoading(flag) {
      this.tableCfg.loading = flag
    },
    $setResponse(response) {
      this.$setLoading(false)
      this.tableData.rows = response.data.rows && response.data.rows
      this.tableData.total = response.data.total && response.data.total
    }
  }
}