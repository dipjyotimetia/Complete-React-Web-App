import expect from 'expect';

import TodoAPI from 'TodoAPI';

describe('TodoAPI', () => {
  beforeEach(() => {
      localStorage.removeItem('tasks');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTasks', () => {
    it('should update localStorage with valid data', () => {
      let savedTasks = [{ id: 23, text: 'test TodoAPI', completed: false }];

      TodoAPI.setTasks(savedTasks);

      let loadedTasks = JSON.parse(localStorage.getItem('tasks'));

      expect(loadedTasks).toEqual(savedTasks);
    });

    it('should NOT update localStorage with INvalid data', () => {
      let badData = {a: 'b'};

      TodoAPI.setTasks(badData);

      expect(localStorage.getItem('tasks')).toBe(null);
    });
  });

  describe('getTasks', () => {
    it('should return an empty array for bad / missing localStorage data', () => {
      // localStorage has been cleaned out, so
      expect(TodoAPI.getTasks()).toEqual([]);

      // Deliberately write something other than an array
      localStorage.setItem('tasks', 'not valid data');
      expect(TodoAPI.getTasks()).toEqual([]);
    });

    it('should load valid data from localStorage', () => {
      let savedTasks = [{ id: 23, text: 'test TodoAPI', completed: false }];

      localStorage.setItem('tasks', JSON.stringify(savedTasks));

      expect(TodoAPI.getTasks()).toEqual(savedTasks);
    });
  });

  describe('filterTasks', () => {
    var tasks = [
      { id: 72, text: "Some uncompleted task", completed: false },
      { id: 83, text: "complete task", completed: true },
      { id: 94, text: "Also uncompleted task", completed: false },
      { id: 94, text: "Another complete task", completed: true },
    ];

    it('should return all items if showCompleted is true', () => {
      let filteredTasks = TodoAPI.filterTasks(tasks, true, '');

      expect(filteredTasks.length).toBe(4);
    });

    it('should return uncompleted items if showCompleted is false', () => {
      let filteredTasks = TodoAPI.filterTasks(tasks, false, '');

      expect(filteredTasks.length).toBe(2);
    })
  });
});
