import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../core/models/task.model";
import {TasksService} from "../../core/services/tasks.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  lang = localStorage.getItem('LANG');
  currentDate = new Date();
  currentDay = this.currentDate.getDay();
  currentMonth = this.currentDate.getMonth();

  form!: FormGroup;
  showForm = false;
  editMode = false;

  tasks: Task[] = [];

  subs: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.translateService.onLangChange.subscribe(lang => {
        this.lang = localStorage.getItem('LANG');
      })
    );
    this.getTasks();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getTasks() {
    this.subs.push(
      this.tasksService.getTasks().subscribe(tasks => this.tasks = tasks)
    );
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      task: [null, [
        Validators.required,
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
      ]],
      checked: [false]
    });
    this.showForm = true;
  }

  saveTask() {
    const savedTask = this.form.value;
    if (this.editMode) {
      const taskIndex = this.tasks.findIndex(task => task.id === savedTask.id)
      this.subs.push(
        this.tasksService.editTask(savedTask).subscribe(response => {
          this.tasks[taskIndex] = savedTask;
        })
      );
    } else {
      this.subs.push(
        this.tasksService.createTask(savedTask).subscribe(response => {
          this.tasks.push(response);
        })
      );
    }

    this.showForm = false;
  }

  editTask(task: any) {
    this.editMode = true;
    this.initForm();
    this.form.patchValue(task);
  }

  deleteTask(task: Task, index: number) {
    this.subs.push(
      this.tasksService.deleteTask(task.id).subscribe(response => {
        this.tasks.splice(index, 1);
      })
    );
  }

  changeStatus(task: Task) {
    task.checked = !task.checked;
    this.subs.push(
      this.tasksService.editTask(task).subscribe(response => {
        task = response;
      })
    );
  }

  dismiss() {
    this.form.reset();
    this.showForm = false;
  }

}
