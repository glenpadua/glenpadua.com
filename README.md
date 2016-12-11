# Follow these steps to run this application:

## Step 1
Clone this repo or make sure that you are working on the latest version of this repo. Always work on the `development` branch.

## Step 2
Make sure that MariaDB server is running in your system. If not, download, install and start the MariaDB service.

Also, create a user other than root, say `<your_name>` and a database `terminology` and grant permissions for that database to that user. Also, set a password for that user.

## Step 3

Create and activate the python virtual environment (Python 3.5 preferred). Install all the python packages from the requirement file like this : `pip install -r requirements.txt`.

## Step 4

Add the developer specific configuration file (inside `app/`). Define the variables that are asked to be defined in the `config.py` file inside the `dev_config.py` file.

## Step 5

To seed the database, type: `python -c "from app.seed import rebuild;rebuild()"`.

## Step 6

Run the application by typing the command : `python run.py`

Now, go to `localhost:5000` in the browser.