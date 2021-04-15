export const usersWrapper = document.querySelector('#users__wrapper');

// import { Students } from './student.js'
// import { Lectors } from './lector.js'
// import { Admins } from './admin.js'

const marks = ['satisfactory', 'good', 'very-good', 'excellent'];

export class User {
    constructor() {
        this.getInfo();
    }

    async getInfo() {
        let response = await fetch('./json/data.json')
        let data = await response.json();
        this.setInfo(data);
        // this.setGradation(data);
    }

    setInfo(data) {
        let users = data.users;
        let roles = data.roles;
        let gradation = data.gradation;
        users.forEach(element => {
            this.courses = [];
            for (let key in element) {
                if (key === 'role') {
                    for (let keyRole in roles) {
                        if (keyRole === element[key]) {
                            this.roleIcon = roles[keyRole];
                        }
                    }
                }
                this[key] = element[key];
                if (key === 'courses') {
                    this[key].forEach(course => {
                        // gradation.forEach((grad, i) => {})
                        for (let i = 0; i < gradation.length; i++) {
                            if (course.mark) {
                                if (course.mark > gradation[i][0] && course.mark <= gradation[i][1]) {
                                    course.mark = marks[i];
                                }
                            }
                            if (course.score) {
                                if (course.score > gradation[i][0] && course.score <= gradation[i][1]) {
                                    course.score = marks[i];
                                }
                            }
                            if (course.studentsScore) {
                                if (course.studentsScore > gradation[i][0] && course.studentsScore <= gradation[i][1]) {
                                    course.studentsScore = marks[i];
                                }
                            }
                        }
                    })

                }
            }
            this.renderUser();
        });
    }

    renderCourses(data) {
        let userCourses = document.createElement('div');
        userCourses.classList.add('user__courses');
        let userCourse;
        let renderCourse = [];
        data.forEach((element) => {
            userCourse = `<p class="user__courses--course ${this.role}">${element.title}<span class="${element.mark}">${element.mark}</span></p>`;
            renderCourse.push(userCourse);
        })
        userCourses.innerHTML = renderCourse.join('');

        return userCourses;
    }

    renderCoursesAdmin(data) {
        let adminCourses = document.createElement('div');
        adminCourses.classList.add('user__courses', 'admin--info');
        let adminCourse;
        let renderCourseAdmin = [];
        data.forEach((element) => {
            adminCourse = `<div class="user__courses--course ${this.role}">
            <p>Title: <b>${element.title}</b></p>
            <p>Admin's score: <span class="${element.score}">${element.score}</span></p>
            <p>Lector: <b>${element.lector}</b></p></div>`;
            renderCourseAdmin.push(adminCourse);
        })
        adminCourses.innerHTML = renderCourseAdmin.join('');
        return adminCourses;
    }

    renderCoursesLector(data) {
        let lectorCourses = document.createElement('div');
        lectorCourses.classList.add('user__courses', 'admin--info');
        let lectorCourse;
        let renderCourseLector = [];
        data.forEach((element) => {
            lectorCourse = `<div class="user__courses--course ${this.role}">
            <p>Title: <b>${element.title}</b></p>
            <p>Lector's score: <span class="${element.score}">${element.score}</span></p>
            <p>Average student's score: <span class="${element.studentsScore}">${element.studentsScore}</span></p></div>`;
            renderCourseLector.push(lectorCourse);
        })
        lectorCourses.innerHTML = renderCourseLector.join('');
        return lectorCourses;
    }


    renderUser() {

        let section = document.createElement('section');
        section.classList.add('user');

        let userInfo = document.createElement('div');
        userInfo.classList.add('user__info');

        let userInfoData = document.createElement('div');
        userInfoData.classList.add('user__info--data');

        let userNaming = document.createElement('div');
        userNaming.classList.add('user__naming');

        let userInfoRole = document.createElement('div');
        userInfoRole.classList.add('user__info--role', `${this.role}`);

        let userName = `<p>Name: <b>${this.name}</b></p>`;
        let userAge = `<p>Age: <b>${this.age}</b></p>`;
        let role = `<p>${this.role}</p>`
        let icon = this.renderIcon();

        let iconRole = this.renderIconRole()
        userInfoData.innerHTML = icon;
        userInfoRole.innerHTML = iconRole + role;
        userNaming.innerHTML = userName + userAge


        userInfoData.append(userNaming);
        userInfo.append(userInfoData, userInfoRole);
        section.append(userInfo);

        let coursesArr = this.courses;

        if (coursesArr.length > 0 && this.role === 'student') {
            section.append(this.renderCourses(coursesArr));
        } else if (coursesArr.length > 0 && this.role === 'admin') {
            section.append(this.renderCoursesAdmin(coursesArr));
        } else if (coursesArr.length > 0 && this.role === 'lector') {
            section.append(this.renderCoursesLector(coursesArr));
        }



        usersWrapper.append(section);
    }
    renderIcon() {
        return `<img src="${this.img}" alt="${this.name}" height="50">`;
    }
    renderIconRole() {
        return `<img src="${this.roleIcon}" alt="${this.role}" height="25">`;
    }
}

class Student extends User {
    constructor(obj) {
        super();
    }
    renderUser() {
        let render = super.renderUser();
        return console.log(render);
    }
}

class Lector extends User {
    constructor(obj) {
        super();
    }
}

class Admin extends User {
    constructor(obj) {
        super();
    }
}

let Users = new User();
// console.log(Users);