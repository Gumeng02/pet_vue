<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <div>
        <el-table-column align="center" prop="id" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="店铺名" prop="name" width="150">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="tel" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="店铺地址" prop="address" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" prop="state" label="Status" width="60" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="registerTime" label="注册时间" width="150">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.registerTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="通过" width="100">
          <el-button slot-scope="scope" @click="pass(scope.row)">通过</el-button>
        </el-table-column>
        <el-table-column prop="created_at" label="拒绝" width="100">
          <el-button slot-scope="scope" @click="outshop(scope.row)">拒绝</el-button>
        </el-table-column >
        <el-table-column prop="created_at" label="删除" width="100">
          <el-button slot-scope="scope" @click="deleteshop(scope.row)">删除</el-button>
        </el-table-column>
        <el-table-column prop="created_at" label="修改" width="100">
          <el-button slot-scope="scope" @click="revise(scope.row)">修改</el-button>
        </el-table-column>
      </div>
    </el-table>
    <el-pagination
      class="pagination"
      align="right"
      background
      layout="prev, pager, next"
      :page-size="per_page"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
        <el-form :model="Data">
          <el-form-item label="id" :label-width="formLabelWidth">
            <el-input v-model="Data.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺名" :label-width="formLabelWidth">
            <el-input v-model="Data.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="Data.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址" :label-width="formLabelWidth">
            <el-input v-model="Data.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="state" :label-width="formLabelWidth">
            <el-input v-model="Data.state" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="makeSure()" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>


</template>

<script>
import {list,outShop,deleteShop,updateShop,paginationList} from "@/api/shop";
import {addEmployee} from "@/api/employee";

export default {
  filters: {
    statusFilter(state) {
      const statusMap = {
        1: 'success',
        0: 'gray',
        2: 'danger',
      }
      return statusMap[state]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      size: 100,
      total: 0,
      currentPage: 1,
      per_page: 2,
      Data: [],
      headArr: [
        { prop: 'id', label: 'id'},
        { prop: 'name', label: '店铺名'},
        { prop: 'tel', label: '手机号'},
        { prop: 'address', label: '店铺地址'},
        { prop: 'state', label: '状态'},
      ],
      dialogVisible: false,
      dialogTitle: '',
      ifMaterialEdit: 0,  // 0表示编辑，1表示新增
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatDate(time){
      var data = new Date(time)
      let strDataTime = (new Date(data)).toLocaleString()
    return strDataTime;
    },
    fetchData() {
      this.listLoading = true
      const params = {
        page: this.currentPage, // 获取当前页码
        pageSize: this.per_page
      }
      console.log(params)
      paginationList(params).then(response => {
        console.log(response)
        if (response['resultCode'] === 200) {
          this.list = response.data.shops
          console.log(this.list)

          // 判断数据的数量是否小于每页显示的数量
          if (this.list.length < params.pageSize) {
            const emptyCount = params.pageSize - this.list.length
            for (let i = 0; i < emptyCount; i++) {
              this.list.push({}) // 添加空数据
            }
          }
          this.listLoading = false
          this.total = response.data.total
          this.Data = data
        } else {
          this.listLoading = false
          this.list = []
          this.$message('数据请求失败')
        }
      })
    },
    pass(row){
      console.log(row)
      if(row.state===-1){
        return this.$message("已拒绝")
      }
      this.Data = row
      let params = {
        // id: row.id,
        username: row.name,
        // password: this.tableData.password,
        email: row.address,
        phone: row.tel,
        state: row.state,
        age: 0,
        did: 19
      }
      console.log(params)
      addEmployee(params).then(response =>{
        if (response['resultCode'] === 200) {
          this.$message("通过成功")
          // this.$router.replace({path:"/audit/index"})
        }else {
          this.$message(response['message'])
        }
      })
    },
    outshop(row){
      console.log(row.id)
      let adminId = {
        id: row.id
      }
      outShop(adminId).then(response =>{
        if (response['resultCode'] === 200) {
          this.$message("拒绝成功")
          // this.$router.replace({path:"/audit/index"})
        }else {
          this.$message(response['message'])
        }
      })
    },
    deleteshop(row){
      console.log(row)
      let params = {id: row.id}
      console.log(params)
      this.$confirm('确认删除吗？','提升', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=> {
        deleteShop(params)
          .then(() => {
            this.$message.success('删除成功')
            this.$router.go(0)
          })
          .catch(error => {
            console.error('删除失败',error)
            this.$message.error('删除失败')
          })
      })
    },
    revise(row){
      this.ifMaterialEdit = 0
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.Data = row
    },
    makeSure(){
      let params = {
        id: this.Data.id,
        name: this.Data.name,
        tel: this.Data.tel,
        address: this.Data.address,
        state: this.Data.state
      }
      console.log(params)
      updateShop(params).then(response =>{
        if (response['resultCode'] === 200) {
          this.$message("修改成功")
          this.$router.go(0)
        }else {
          this.$message(response['message'])
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
  }
}
</script>
<style>
  .pagination{
    margin-top: 16px;
  }
</style>
