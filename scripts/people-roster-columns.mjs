/** 人员名册 Excel 列定义（与 Person 类型字段对应） */
export const ROSTER_COLUMNS = [
  { key: "slug", header: "标识(slug)", width: 28 },
  { key: "cohortId", header: "届别ID", width: 12 },
  { key: "name", header: "姓名", width: 10 },
  { key: "role", header: "角色", width: 16 },
  { key: "unit", header: "所属单位", width: 22 },
  { key: "academicTitle", header: "职称", width: 18 },
  { key: "college", header: "学院", width: 22 },
  { key: "grade", header: "年级", width: 10 },
  { key: "major", header: "专业", width: 18 },
  { key: "focus", header: "研究方向/职责", width: 28 },
  { key: "bio", header: "个人简介", width: 48 },
  { key: "tags", header: "标签(逗号分隔)", width: 24 },
  { key: "email", header: "邮箱", width: 22 },
  { key: "avatar", header: "头像路径(自动同步)", width: 42 },
];

export const ROLE_ORDER = [
  "指导老师",
  "社团主要负责人",
  "社团负责人",
  "部门负责人",
  "科研小组负责人",
  "部门干事",
];

export const VALID_ROLES = new Set(ROLE_ORDER);

/** 第一届指导老师固定排序 */
export const ADVISOR_NAME_ORDER = ["杨裔", "李彩虹", "任超"];

export const COHORT_XLSX_PATHS = [
  {
    cohortId: "gen-1",
    label: "第一届",
    xlsx: ["组织架构 照片", "第一届", "人员介绍.xlsx"],
  },
];

export function personToRow(person) {
  return {
    slug: person.slug ?? "",
    cohortId: person.cohortId ?? "",
    name: person.name ?? "",
    role: person.role ?? "",
    unit: person.unit ?? "",
    academicTitle: person.academicTitle ?? "",
    college: person.college ?? "",
    grade: person.grade ?? "",
    major: person.major ?? "",
    focus: person.focus ?? "",
    bio: person.bio ?? "",
    tags: Array.isArray(person.tags) ? person.tags.join("，") : "",
    email: person.email ?? "",
    avatar: person.avatar ?? "",
  };
}

export function rowToPerson(row, defaults = {}) {
  const tagsRaw = String(row.tags ?? "").trim();
  const tags = tagsRaw
    ? tagsRaw
        .split(/[,，;；|]/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const person = {
    slug: String(row.slug ?? "").trim(),
    cohortId: String(row.cohortId ?? defaults.cohortId ?? "gen-1").trim(),
    name: String(row.name ?? "").trim(),
    role: String(row.role ?? "").trim(),
    unit: String(row.unit ?? "").trim(),
    focus: String(row.focus ?? "").trim(),
    bio: String(row.bio ?? "").trim(),
    tags,
    avatar: String(row.avatar ?? "").trim(),
  };

  const academicTitle = String(row.academicTitle ?? "").trim();
  const college = String(row.college ?? "").trim();
  const grade = String(row.grade ?? "").trim();
  const major = String(row.major ?? "").trim();
  const email = String(row.email ?? "").trim();

  if (academicTitle) person.academicTitle = academicTitle;
  if (college) person.college = college;
  if (grade) person.grade = grade;
  if (major) person.major = major;
  if (email) person.email = email;

  return person;
}

export function sortPeopleForExport(people) {
  return [...people].sort((a, b) => {
    const ra = ROLE_ORDER.indexOf(a.role);
    const rb = ROLE_ORDER.indexOf(b.role);
    if (ra !== rb) return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);

    if (a.role === "指导老师" && b.role === "指导老师") {
      const ia = ADVISOR_NAME_ORDER.indexOf(a.name);
      const ib = ADVISOR_NAME_ORDER.indexOf(b.name);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
    }

    return a.name.localeCompare(b.name, "zh-CN");
  });
}
