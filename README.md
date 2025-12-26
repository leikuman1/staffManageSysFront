# staffManageSysFront

## API 文档

### 基础路径

所有 API 的基础路径为：`http://localhost:8080/api`

### 员工管理 API

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/staff | 获取所有员工 |
| GET | /api/staff/{id} | 根据 ID 获取员工 |
| GET | /api/staff/staffno/{staffNo} | 根据工号获取员工 |
| GET | /api/staff/department/{departmentId} | 获取部门下的所有员工 |
| GET | /api/staff/status/{status} | 根据状态获取员工 |
| GET | /api/staff/position/{position} | 根据职位获取员工 |
| GET | /api/staff/search?name={name} | 搜索员工 |
| POST | /api/staff | 创建新员工 |
| PUT | /api/staff/{id} | 更新员工信息 |
| DELETE | /api/staff/{id} | 删除员工 |

### 部门管理 API

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/departments | 获取所有部门 |
| GET | /api/departments/{id} | 根据 ID 获取部门 |
| GET | /api/departments/code/{code} | 根据编码获取部门 |
| GET | /api/departments/parent/{parentId} | 获取子部门 |
| GET | /api/departments/search?name={name} | 搜索部门 |
| POST | /api/departments | 创建新部门 |
| PUT | /api/departments/{id} | 更新部门信息 |
| DELETE | /api/departments/{id} | 删除部门 |

### 请求示例

#### 创建员工

```bash
curl -X POST http://localhost:8080/api/staff \
  -H "Content-Type: application/json" \
  -d '{
    "staffNo": "T001",
    "name": "张三",
    "gender": "男",
    "birthDate": "1990-01-01",
    "phone": "13800138000",
    "email": "zhangsan@school.com",
    "idCard": "110101199001011234",
    "departmentId": 1,
    "position": "教师",
    "hireDate": "2020-09-01",
    "status": "在职",
    "address": "北京市朝阳区",
    "isActive": true
  }'
```

#### 创建部门

```bash
curl -X POST http://localhost:8080/api/departments \
  -H "Content-Type: application/json" \
  -d '{
    "code": "DEPT001",
    "name": "计算机学院",
    "description": "计算机科学与技术学院",
    "parentId": null,
    "level": 1,
    "isActive": true
  }'
```

### 响应格式

所有 API 返回统一的 JSON 格式：

```json
{
  "code": 200,
  "message": "Success",
  "data": {
    // 数据内容
  }
}
```

## 数据模型

### Staff (员工)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Long | 主键 |
| staffNo | String | 工号（唯一） |
| name | String | 姓名 |
| gender | String | 性别 |
| birthDate | LocalDate | 出生日期 |
| phone | String | 电话 |
| email | String | 邮箱 |
| idCard | String | 身份证号 |
| department | Department | 所属部门 |
| position | String | 职位 |
| hireDate | LocalDate | 入职日期 |
| status | String | 状态 |
| address | String | 地址 |
| isActive | Boolean | 是否启用 |
| createdAt | LocalDateTime | 创建时间 |
| updatedAt | LocalDateTime | 更新时间 |

### Department (部门)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Long | 主键 |
| code | String | 部门编码（唯一） |
| name | String | 部门名称 |
| description | String | 描述 |
| parentId | Long | 父部门 ID |
| level | Integer | 层级 |
| isActive | Boolean | 是否启用 |
| createdAt | LocalDateTime | 创建时间 |
| updatedAt | LocalDateTime | 更新时间 |
