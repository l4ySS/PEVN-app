const db = require('../db')

class StudentController{
    async createStudent(req, res){
        const {surname, name, kurs, faculty, group} = req.body
        console.log({surname, name, kurs, faculty, group})
        try{
            const newStudent = await db.query(
            'INSERT INTO public.student(surname, name, kurs, faculty, \"group\")VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [surname, name, kurs, faculty, group]
                )
            res.json(newStudent.rows[0])
        } catch(error){
            res.status(500).json({
                message: 'error',
                error
            })
        }
    }

    async getStudents(req, res){    
        try {
            const students = await db.query(
                'SELECT * FROM public.student'
                )
            res.status(200).json(students.rows)
        } catch(error){
            res.status(500).json({
                message: 'error',
                error
            })
        }
    }

    async getOneStudent(req, res){
        const id = req.params.id 
        try {
            const student = await db.query(
                'SELECT * FROM public.student WHERE stud_id = $1', [id]
                )
            res.status(200).json(student.rows[0])
        } catch(error){
            res.status(500).json({
                message: 'error',
                error
            })
        }
    }

    async updateStudent(req, res){
        const {surname, name, kurs, faculty, group, stud_id } = req.body;
        console.log(stud_id)
        try{
            const student = await db.query(
                'UPDATE public.student SET surname = $1, name = $2, kurs = $3, faculty = $4, \"group\" = $5 WHERE student.stud_id = $6 RETURNING *',
                [surname, name, kurs, faculty, group, stud_id]
            )
            res.status(200).json(student.rows[0])
        } catch(error){
            res.status(500).json({
                message: 'error',
                error
            })
        }

    }

    async deleteStudent(req, res){
        const id = req.params.id
        try{
            const student = await db.query(
                'DELETE FROM public.student WHERE stud_id = $1 RETURNING *', 
                [id]
            )
            res.status(200).json(student.rows[0])
        } catch(error){
            res.status(500).json({
                message: 'error',
                error
            })
        }
    }
}

module.exports = new StudentController()