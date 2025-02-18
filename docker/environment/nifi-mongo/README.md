
Obiettivi:

- Ambiente:
  - istanza MogoDB
  - istanza Nifi
- Target:
  - csv2json
  - csv2mongo


```shell
docker network create net-corso-mongo

docker run -d --name mongo-test -h mongo-test -p 27117:27017 --network net-corso-mongo mongo
docker run -d --name nifi-test -h nifi-test -p 8443:8443 -e NIFI_WEB_HTTPS_PORT='8443' -e SINGLE_USER_CREDENTIALS_USERNAME=admin -e SINGLE_USER_CREDENTIALS_PASSWORD=Corso2025_02 --network net-corso-mongo -v .\csv:/work/csv -v .\json:/work/json apache/nifi:latest


docker run 
    -d 
    --name mongo-test 
    -h mongo-test 
    -p 27117:27017 
    --network net-corso-mongo 
    mongo

docker run 
    -d
    --name nifi-test
    -h nifi-test
    -p 8443:8443 
    -e NIFI_WEB_HTTPS_PORT='8443'
    -e SINGLE_USER_CREDENTIALS_USERNAME=admin
    -e SINGLE_USER_CREDENTIALS_PASSWORD=Corso2025_02
    --network net-corso-mongo
    -v .\csv:/work/csv
    -v .\json:/work/json
    apache/nifi:latest


```


```javascript
// conversione dell'estensioen file nel processor updateattribute
${filename:replace('.csv','.json')}

// JoltTransformJson rules:
[
	{
		"operation": "shift",
		"spec": {
			"*": "&"
		}
	},
	{
			"operation": "default",
			"spec": {
				"filename": "${filename}",
				"import_type": "csv",
				"import_time": "${now():format('yyyy-MM-dd HH:mm:ss')}",
				"recordId": "${uuid}"				
			}
	}
]

```