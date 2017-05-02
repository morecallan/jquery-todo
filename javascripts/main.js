$(document).ready(function(){

	$('#new-item').click(() => {
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
	});

	$('#list-items').click(() => {
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');
	});

	//get todo
	FbApi.getTodos().then(() => {
		FbApi.writeDom();
		countTask();
	})
	.catch((error) => {
		console.log("getTodos Error", error);
	});

  //add todo
  $('#add-todo-button').click(() => {
  	let newTodo = {
  		isCompleted: false,
  		task: $('#add-todo-text').val()
  	};
  	FbApi.addTodo(newTodo).then(() => {
  		$('#add-todo-text').val("");
  		$('.new-container').addClass('hide');
			$('.list-container').removeClass('hide');
  		FbApi.writeDom();
  		countTask();
  	}).catch((error) => {
  		console.log("addTodo error", error);
  	});
  });




  //delete todo
	  $('.main-container').on('click', '.delete', (event)=> {
			const id = event.target.id;
			FbApi.deleteTodo(id).then(() => {
				FbApi.writeDom();
				countTask();
			}).catch((error) => {
	  		console.log("delete error", error);
	  	});
		});


  //edit todo
	$('.main-container').on('click', '.edit', (event)=> {
		const id = event.target.id;

		FbApi.editTodo(id).then((oldText) => {
			$('.list-container').addClass('hide');
			$('.new-container').removeClass('hide');
			$('#add-todo-text').val(oldText);
		}).catch((error) => {
			console.log("delete error", error);
		});

	});




  //complete todos
  $('.main-container').on('click', 'input[type="checkbox"]', (event)=>{
  	FbApi.checker(event.target.id).then(() =>{
  		FbApi.writeDom();
  		countTask();
  	}).catch((error) => {
  		console.log("checker error", error);
  	});
  });





	let countTask = () => {
		let remainingTasks = $('#incomplete-tasks li').length;
		$('#counter').hide().fadeIn(300).html(remainingTasks);
	};





});
