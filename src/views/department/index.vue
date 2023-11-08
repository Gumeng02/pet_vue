<template>
  <div class="custom-tree-node">
    <div class="left">
      <div class="action">
        <el-button icon="el-icon-plus" @click="toAddDepartmentPage">新增部门</el-button>
        <el-button icon="el-icon-plus" @click="deleteDepartment">删除部门</el-button>

        <!--        <el-button type="primary" icon="el-icon-plus">删除部门</el-button>-->
      </div>

      <el-tree
        ref="tree"
        :data="data1"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
      />
    </div>

    <div class="right">
      <el-button icon="el-icon-plus" @click="editAndAddMaterial()">新增人员</el-button>
      <el-button plain icon="el-icon-delete">批量删除</el-button>
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="50"/>
        <el-table-column prop="id" type="id" width="100"/>
        <el-table-column prop="username" type="用户名" width="100"/>
        <el-table-column prop="email" type="邮箱" width="100"/>
        <el-table-column prop="phone" type="手机号" width="100"/>
        <el-table-column prop="age" type="年龄" width="100"/>
        <el-table-column prop="state" type="状态" width="100"/>
        <el-table-column prop="did" type="部门" width="100"/>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editAndAddMaterial(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteEmployee(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="page"
        :page-size="size"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
<!--        <el-table-column align="center" label="ID" width="95">-->
<!--          <template slot-scope="scope">-->
<!--            {{ scope.$index }}-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="Title">-->
<!--          <template slot-scope="scope">-->
<!--            {{ scope.row.title }}-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="Author" width="110" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{ scope.row.author }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="Pageviews" width="110" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            {{ scope.row.pageviews }}-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column class-name="status-col" label="Status" width="110" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
<!--          <template slot-scope="scope">-->
<!--            <i class="el-icon-time" />-->
<!--            <span>{{ scope.row.display_time }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
        <el-form :model="tableData">
          <el-form-item label="id" :label-width="formLabelWidth">
            <el-input v-model="tableData.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="名字" :label-width="formLabelWidth">
            <el-input v-model="tableData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="tableData.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="email" :label-width="formLabelWidth">
            <el-input v-model="tableData.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="phone" :label-width="formLabelWidth">
            <el-input v-model="tableData.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="tableData.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门id" :label-width="formLabelWidth">
            <el-input v-model="tableData.did" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="tableData.state" placeholder="请选择状态">
              <el-option label="在职" value="0"></el-option>
              <el-option label="离职" value="1"></el-option>
            </el-select>
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
  import { list } from '@/api/department'
  import { deleteDepartment } from "@/api/department";
  import { addEmployee , findAll , updateEmployee ,deleteEmployee} from '@/api/employee'

export default {
  data() {
    return {
      filterText: '',
      data1: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [

      ],
      headArr: [
        { prop: 'id', label: 'id'},
        { prop: 'username', label: '名字'},
        { prop: 'email', label: 'email'},
        { prop: 'age', label: '年龄'},
        { prop: 'phone', label: 'phone'},
        { prop: 'state', label: '状态'},
        { prop: 'did', label: '部门id'},
      ],
      dialogVisible: false,
      dialogTitle: '',
      ifMaterialEdit: 0,  // 0表示编辑，1表示新增
      formLabelWidth: '120px'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.fetchTreeData()
    this.fetchData()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchTreeData() {
      this.listLoading = true
      list().then(Response => {
        this.data = Response.data
        this.data1 = this.data
      })
    },
    fetchData() {
      this.listLoading = true
      findAll().then(Response => {
        this.data = Response.data
        this.tableData = this.data
        console.log(this.data)
      })
    },
    deleteDepartment(){
      const r = this.$refs.tree.getCurrentNode()
      if(!r) {
        this.$.warning('未选择删除部门')
        return
      }
      const departmentId = r.id
      this.$confirm('确认删除吗？','提升', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(()=> {
          deleteDepartment({id: departmentId })
            .then(() => {
               this.treeData()
               this.fetchData()
               this.$message.success('删除成功')
            })
            .catch(error => {
              console.error('删除失败',error)
              this.$message.error('删除失败')
            })
          })
    },
    toAddDepartmentPage() {
      const r = this.$refs.tree.getCurrentNode()
      console.log(r)
      if (r) {
        this.$router.push({ name: 'Create', params: { data: r }})
      } else {
        const d1 = this.data1[0]
        this.$router.push({ name: 'Create', params: { data: d1 }})
      }
      // this.$router.push({ path: '/department/create' })
    },
    editAndAddMaterial(row){
      if (row) {
        this.ifMaterialEdit = 0
        this.dialogVisible = true
        this.dialogTitle = '编辑'
        this.tableData = row
      } else {
        this.ifMaterialEdit = 1
        this.dialogVisible = true
        this.dialogTitle = '新增'
        this.tableData = {}
      }
    },
    deleteEmployee(row){
      let id = {id: this.tableData.id}
      console.log(id)
      console.log(this.tableData)
      this.$confirm('确认删除吗？','提升', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=> {
        deleteEmployee(id)
          .then(() => {
            this.$message.success('删除成功')
          })
          .catch(error => {
            console.error('删除失败',error)
            this.$message.error('删除失败')
          })
      })
    },
    makeSure(){
      let params = {
        id: this.tableData.id,
        username: this.tableData.username,
        password: this.tableData.password,
        email: this.tableData.email,
        phone: this.tableData.phone,
        state: this.tableData.state,
        age: this.tableData.age,
        did: this.tableData.did
      }
      if (this.ifMaterialEdit === 1){
        addEmployee(params).then(response =>{
          if (response['resultCode'] === 200) {
            this.$router.replace({path:"/department/index"})
          }else {
            this.$message(response['message'])
          }
        })
      }else if (this.ifMaterialEdit ===0){
        updateEmployee(params).then(response =>{
          console.log('requestData:', requestData)
          if (response['resultCode'] === 200) {
            this.$router.replace({path:"/department/index"})
          }else {
            this.$message(response['message'])
          }
        })
      }else {
        this.$message.warning('请稍后再试')
      }
    }
  }
}
</script>
<style scoped>
  .action{
    margin-bottom: 16px;
    margin-top: 32px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    padding-right: 8px;
  }
  .left {
    width: 300px;
    flex-grow: 1;
    margin-left: 32px;
    border-right: 2px solid lightslategray;
    margin-right: 32px;
  }
  .right {
    flex-grow: 2;
  }
  .menmber {
    margin-top: 16px;
  }
</style>

