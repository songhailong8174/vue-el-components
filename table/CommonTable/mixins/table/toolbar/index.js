export default {
    methods: {
      $handleAdd() {
        this.$emit('add')
      },
      $handleUpdate(row) {
        const key = row[this.rowKey]
        this.$emit('modify', key)
      },
      $handleDelete(row) {
        const title = this.msgs.del && this.msgs.del.title || '提示'
        const content = this.msgs.del && this.msgs.del.content || '确定要删除吗?'
        this.$confirm(content, title).then(() => {
          const key = row[this.rowKey]
          this.$emit('remove', key)
        })
      },
      $handleExport() {
        this.$modal.confirm('是否确认导出所有数据?').then(() => {
          this.$emit('export')
        })
      },
    }
  }