<template>
    <div>
        <div><template>
        <v-form><v-container >
        <v-row>
        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
            v-model="searchFaculty"
            label="Факультет"
            ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
            v-model="searchKurs"
            label="Курс"
            ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
            v-model="searchGroup"
            label="Группа"
            ></v-text-field>
        </v-col>
        </v-row>
        </v-container></v-form>
        </template></div>


        <div>
        <v-row justify="center">
        <v-dialog
         v-model="add"
         persistent
         width="1024"
        >

       <!-- <template v-slot:activator="{ props }"><v-btn color="primary" v-bind="props" @click="add = true"> Добавить студента </v-btn></template> -->
   
        <v-card>
        <v-card-title> <span class="text-h5">Добавить запись</span> </v-card-title>
        <v-card-text> <v-container>
            <div class="modal-content">
                <table><tr>
                    <td>Фамилия: </td> 
                    <td><v-text-field 
                        v-model="studentToAdd.surname" 
                        :rules="rules"
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <td>Имя: </td>
                    <td><v-text-field 
                         v-model="studentToAdd.name" 
                         :rules="rules"
                         ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <td>Факультет: </td>
                    <td><v-text-field 
                        v-model="studentToAdd.faculty" 
                        :rules="rules"
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <td>Курс: </td>
                    <td><v-select v-model="studentToAdd.kurs" 
                        :rules="rules" 
                        :items="['1', '2', '3', '4']"
                        ></v-select>
                    </td>                       
                </tr>
                <tr>
                    <td>Группа: </td>
                    <td><v-text-field 
                         v-model="studentToAdd.group" 
                         :rules="[v => /[0-9]/.test(v) || 'Введите число.']"
                         type="number" 
                         min="1" max="15"
                         ></v-text-field>
                    </td>
                </tr></table>
            </div>
          </v-container>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="add = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="() => {addStudent(); add = false}"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>


    <v-dialog
      v-model="edit"
      persistent
      width="1024"
    >
      <v-card>
        <v-card-title><span class="text-h5">Редактировать запись</span></v-card-title>
        <v-card-text>
          <v-container>
            <div class="modal-content">
                <table >
                    <tr >
                    <td >ID: </td> 
                    <td ><v-text-field v-model="studentToEdit.stud_id" :rules="rules" readonly hint="Редактирование запрещено."></v-text-field></td>
                </tr>
                    <tr >
                    <td >Фамилия: </td> 
                    <td ><v-text-field v-model="studentToEdit.surname" :rules="rules" ></v-text-field></td>
                </tr>
                <tr>
                    <td>Имя: </td>
                    <td> <v-text-field v-model="studentToEdit.name" :rules="rules"></v-text-field></td>
                </tr>
                <tr>
                    <td>Факультет:   </td>
                    <td> <v-text-field v-model="studentToEdit.faculty" :rules="rules"></v-text-field></td>
                </tr>
                <tr>
                    <td>Курс: </td>
                    <td> 
                        <v-select v-model="studentToEdit.kurs" item-value="text" :rules="rules" :items="['1', '2', '3', '4']" >
                        </v-select>
                    </td>                       
                </tr>
                <tr>
                    <td>Группа: </td>
                    <td><v-text-field v-model="studentToEdit.group"  
                         :rules="[v => /[0-9]/.test(v) || 'Введите число.']"
                         type="number" 
                         min="1" max="15"></v-text-field></td>
                </tr></table>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="() => {studentToEdit = {}; edit = false}"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="() => {editStudent(); edit = false}"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
  <div>
        <table class = "tableStud">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Имя</th>
                <th scope="col">Факультет</th>
                <th scope="col">Курс</th>
                <th scope="col">Группа</th>
                <th scope="col">Действие</th>
            </tr>
        </thead>
        <tbody>
           <tr v-for="(student, index) in filteredStudents" :key="index"> 
            
                <td>{{student.stud_id}}</td>
                <td>{{student.surname}}</td>
                <td>{{student.name}}</td>
                <td>{{student.faculty}}</td>
                <td>{{student.kurs}}</td>
                <td>{{student.group}}</td>
                <td> <v-btn color="blue" x-small dark @click="() => {getStudent(student.stud_id); edit = true}">
            <v-icon>mdi-pencil</v-icon>
            </v-btn><v-btn color="red" x-small dark @click="() => {deleteStudent(student.stud_id)}"><v-icon>mdi-cancel</v-icon></v-btn>
         
          </td>
      
           </tr> 
        </tbody>
        </table>
        </div>
        <div>
          <v-btn @click="add=true" color="blue" large right fixed bottom fab dark>
          <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  data(){
    return {
        add: false,
        edit: false,
        rules: [
            value => !!value || 'Обязательное поле.'
        ],

        studentToAdd: {},
        studentToEdit: {},
        students: [],

        searchFaculty: '',
        searchKurs: '',
        searchGroup: '',
    }
  },
  mounted(){
        this.getStudents()
  },
  methods: {
    async addStudent(){
        const student = this.studentToAdd;
        try {
        const response = await axios.post('http://localhost:8082/api/student', student);
        this.students.push(response.data)
        } catch(error){
          this.console.log(error);
        }
    },
    async editStudent(){
        const student = this.studentToEdit;
        try {
          const response = await axios.put('http://localhost:8082/api/student', student);
          const target = this.students.find(stud => stud.stud_id === student.stud_id);
          Object.assign(target, student);
        } catch(error){
          this.console.log(error);
        }    
    },
    async getStudents(){
        try{
          const response = await axios.get('http://localhost:8082/api/student')
          this.students = response.data;
        } catch(error){
          this.console.log(error);
        }
    },
    async getStudent(id){
        try{
          const response = await axios.get('http://localhost:8082/api/student/' + id)
          this.studentToEdit = response.data;
        } catch(error){
          this.console.log(error);
        }
    },
    async deleteStudent(id){
        try{
          const response = await axios.delete('http://localhost:8082/api/student/' + id)
          const newStudents = this.students.filter(stud => { return stud.stud_id != id; });
          const itemToRemoveIndex = this.students.findIndex(function(item) {
          return item.stud_id === id;
          });
          if(itemToRemoveIndex !== -1){
            this.students.splice(itemToRemoveIndex, 1);
          }
        } catch(error){
          this.console.log(error)
        }
    },
    confirmDeleting: () => {

    }
    },
    computed: {
    console() {
      return console
    },
    filteredStudents() {
      return this.students.filter((stud) => 
      { return stud.faculty.includes(this.searchFaculty) && 
        stud.group.toString().includes(this.searchGroup) && 
        stud.kurs.toString().includes(this.searchKurs)
    
    })
    }
  },
  }
</script>




<style scoped land="scss">
       
        v-select{
            border: 100px solid #2a4cc7;
        }
        input{
            border: 1px solid #2a4cc7;
        }
        

     

        .modal-content{
            margin-bottom: 20px;
        }

.tableStud {
	width: 100%;
	border: none;
	margin-bottom: 20px;
	border-collapse: separate;
}

.tableStud thead th {
	font-weight: bold;
	text-align: left;
	border: none;
	padding: 10px 15px;
	background: #EDEDED;
	font-size: 14px;
	border-top: 1px solid #ddd;
}

.tableStud tr th:first-child, .tableStud tr td:first-child {
	border-left: 1px solid #ddd;
}

.tableStud tr th:last-child, .tableStud tr td:last-child {
	border-right: 1px solid #ddd;
}

.tableStud thead tr th:first-child {
	border-radius: 20px 0 0 0;
}

.tableStud thead tr th:last-child {
	border-radius: 0 20px 0 0;
}

.tableStud tbody td {
	text-align: left;
	border: none;
	padding: 10px 15px;
	font-size: 14px;
	vertical-align: top;
}

.tableStud tbody tr:nth-child(even) {
	background: #F8F8F8;
}

.tableStud tbody tr:last-child td{
	border-bottom: 1px solid #ddd;
}

.tableStud tbody tr:last-child td:first-child {
	border-radius: 0 0 0 20px;
}

.tableStud tbody tr:last-child td:last-child {
	border-radius: 0 0 20px 0;
}


table {
	width: 100%;
	border: none;
	margin-bottom: 20px;
	border-collapse: separate;
}





</style>