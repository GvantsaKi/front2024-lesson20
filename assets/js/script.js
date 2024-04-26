function header() {
}

header();

function formActions() {
	const openRegFormBtn = document.querySelector("#open-reg-form");

	function showSelectedModal(selector) {
		const modal = document.querySelector(selector);
		const closeModalBtn = modal.querySelector(".modal-close");
		modal.classList.add("open");
		closeModalBtn.addEventListener("click", () => {
			modal.classList.remove("open");
		});
	}

	openRegFormBtn.addEventListener("click", () => {
		showSelectedModal("#reg-modal");
	});



	const createUserUrl = "https://borjomi.loremipsum.ge/api/register", 
		getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", 
		getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", 
		updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", 
		deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; 

	const regForm = document.querySelector("#reg"),
		userName = document.querySelector("#user_name"),
		userSurname = document.querySelector("#user_surname"),
		userEmail = document.querySelector("#user_email"),
		userPhone = document.querySelector("#user_phone"),
		userPersonalID = document.querySelector("#user_personal-id"),
		userZip = document.querySelector("#user_zip-code"),
		userGender = document.querySelector("#user_gender"),
		user_id = document.querySelector("#user_id");

	const userreg = {
		first_name: userName,
		last_name: userSurname,
		phone: userPhone,
		id_number: userPersonalID,
		email: userEmail,
		gender: userGender,
		zip_code: userZip,
	};





	function renderUsers(user) {

		const mytable = document.getElementById("data_table");

		user.forEach(user => {
			let newRow = document.createElement("tr");
			Object.values(user).forEach((value) => {
				let cell = document.createElement("td");
				cell.innerText = value;
				newRow.appendChild(cell);

			})

			

			createEditButton(newRow, user);
			createDeleteButton(newRow, user);
			mytable.appendChild(newRow);
		});
		userActions();
	}

	function userActions() {
	}

	function getAllUsers() {
		fetch("https://borjomi.loremipsum.ge/api/all-users")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				const users = data.users;
				renderUsers(users);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getUser(id) {
		fetch(`http://borjomi.loremipsum.ge/api/get-user/${id}`)
			.then((res) => res.json())
			.then((data) => {
				const user = data.users;
				return user.value;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function deleteUser(id) {
		fetch(`http://borjomi.loremipsum.ge/api/delete-user/${id}`, {
			method: "delete",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				getAllUsers(); 
			})
			.catch((error) => {
				console.log(error);
			});
	}



	function updateUser(userObj) {

		fetch(`http://borjomi.loremipsum.ge/api/update-user/${userObj.id}`, {
			method: "put",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				return data;
			})
			.catch((error) => {
				console.log(error);
			});

	}

	function addNewUser(info) {
		fetch("https://borjomi.loremipsum.ge/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(info),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				console.log(data);
				getAllUsers();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getAllUsers();

	regForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const userNameValue = userName.value;
		const userEmailValue = userEmail.value;
		const userSurnameValue = userSurname.value;
		const userPersonalIDValue = userPersonalID.value;
		const userPhoneValue = userPhone.value;
		const userGenderValue = userGender.value;
		const userZipValue = userZip.value;

		const user = {
			id: user_idvalue, 
			first_name: userNameValue,
			last_name: userSurnameValue,
			phone: userPhoneValue,
			id_number: userPersonalIDValue,
			email: userEmailValue,
			gender: userGenderValue,
			zip_code: userZipValue,
		};

		addNewUser(user);

	});

	function createEditButton(newRow, user) {
		let edit = document.createElement("td");
		newRow.appendChild(edit);
		var userid = user["id"];
		const deleteExpense = "<button class='editbutton' id = '" + userid + "'>Edit</button>";
		edit.innerHTML = deleteExpense;
		edit.addEventListener("click", () => {
			showSelectedModal("#edit-modal");

			var gerUserById = getUser(userid);

		});
	}



	function createDeleteButton(newRow, user) {
		let deleteUserCell = document.createElement("td");
		newRow.appendChild(deleteUserCell);
		const deleteExpense = "<button class='deleteButton' id = '" + user["id"] + "'>Delete</button>";
		deleteUserCell.innerHTML = deleteExpense;
		deleteUserCell.addEventListener("click", () => {
			deleteUser(user["id"]);
		});


	}
}

formActions();
