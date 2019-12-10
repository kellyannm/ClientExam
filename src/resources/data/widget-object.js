newwidget(id)
{this.selectedwidget = {};
this.selectedwidget.widget = "";
this.selectedwidget.detail = "";
this.selectedwidget.dateDue = new Date();
this.selectedwidget.status = "widget";
this.selectedwidget.userId = id;
    }
async savewidget()
{let serverResponse;
  if (this.selectedwidget)
  if (this.selectedwidget._id) {
    let url = this.widget_SERVICE + "/" + this.selectedwidget._id;
          serverResponse = await this.data.put(this.selectedwidget, url);
        } else {
          serverResponse = await this.data.post(this.selectedwidget, this.widget_SERVICE);
        }
        return serverResponse;
      }
  async getwidgets(userid) 
  {let url = this.widget_SERVICE + '/user/' + userid;
        let response = await this.data.get(url);
        if (!response.error) {
          this.widgetsArray = response;
        } else {
          this.widgetsArray = [];
        }
      }


